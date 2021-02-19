"""

    This script gets the Github project data
    For example, we want to have the data of the first 1000 projects in the projectList.txt
    We call function as:
    getGithubdatafromRange_Graphv4(0,1000)
    *** to change the saving directory, please update it inside the according function ***

"""

import os
import requests
import pandas as pd
import numpy as np
import time
import csv
from scripts.updateInfo import your_email, getGithubToken
from scripts import updateFlag

query = """{ 
  repository(owner:"%s", name:"%s") { 
    createdAt
    issues(states:OPEN){
      totalCount
    }
    description
    homepageUrl
    licenseInfo {name}
    owner{
      url
      __typename
    }
    isArchived
    isLocked
    isEmpty
    databaseId
    pullRequests{totalCount}
    primaryLanguage{
      name
      
    }
    stargazers{totalCount}
    watchers{totalCount}
    updatedAt
    releases{totalCount}
    pushedAt
    url
    labels{
      totalCount
    }
    languages(first:100){
      totalSize
      totalCount
    }
	nameWithOwner
  }
}"""

query2 = """{
  repository(owner:"%s", name:"%s") {
    issues(states:CLOSED){
      totalCount
    }
  }
}"""

featureString = "project_id,created_at,description,homepage_url,is_archived,is_empty,is_locked,open_issue_count,closed_issue_count,label_count,language_count,loc_count,license_name,full_name,owner_type,owner_url,primary_language,pull_request_count,pushed_at,release_count,stargazer_count,updated_at,github_url,watcher_count"
featureList = featureString.split(",")
personal_token = getGithubToken(your_email)
token = os.getenv('GITHUB_TOKEN', personal_token)
headers = {'Authorization': f'token {token}'}

def getGithubMainData2CSV_Graphv4(projectfullname, githubdatacsv):
    theQuery = f"https://api.github.com/repos/{projectfullname}"
    r_search = requests.get(theQuery, headers=headers)
    result = r_search.json()
    owner = projectfullname.split('/')[0]
    repo = projectfullname.split('/')[1]
    response_v4 = requests.post('https://api.github.com/graphql', json={'query': query%(owner,repo)}, headers=headers)
    result_v4 = response_v4.json()
    response_v4_closedissues = requests.post('https://api.github.com/graphql', json={'query': query2%(owner, repo)},
                                headers=headers)
    result_v4_closedissues = response_v4_closedissues.json()
    if "errors" in result_v4 and "Could not resolve to a Repository with the name" in result_v4['errors'][0]['message'] and "API rate limit exceeded" not in result_v4['errors'][0]['message']:
        print("Project not exist any more. Sad.")
        return 0
    elif "errors" in result_v4 and "API rate limit exceeded" in result_v4['errors'][0]['message'] and result_v4['errors'][0]['type']=='RATE_LIMITED':
        print("API rate limit exceeded. Stop Crawling Now.")
        print("Wait for 30 mins to restart....")
        time.sleep(1800)
        return 1
    else:
        project_id = result_v4['data']['repository']['databaseId']
        thereturn = []
        thereturn.append(result_v4['data']['repository']['databaseId'])
        thereturn.append(pd.to_datetime(result_v4['data']['repository']['createdAt']))
        thereturn.append(result_v4['data']['repository']['description'])
        if result_v4['data']['repository']['homepageUrl']=='':
            thereturn.append(np.NaN)
        else:
            thereturn.append(result_v4['data']['repository']['homepageUrl'])
        thereturn.append(result_v4['data']['repository']['isArchived'])
        thereturn.append(result_v4['data']['repository']['isEmpty'])
        thereturn.append(result_v4['data']['repository']['isLocked'])
        thereturn.append(result_v4['data']['repository']['issues']['totalCount'])
        thereturn.append(result_v4_closedissues['data']['repository']['issues']['totalCount'])
        thereturn.append(result_v4['data']['repository']['labels']['totalCount'])
        thereturn.append(result_v4['data']['repository']['languages']['totalCount'])
        thereturn.append(result_v4['data']['repository']['languages']['totalSize'])
        if result_v4['data']['repository']['licenseInfo'] == None:
            thereturn.append(np.NaN)
        else:
            thereturn.append(result_v4['data']['repository']['licenseInfo']['name'])
        thereturn.append(result_v4['data']['repository']['nameWithOwner'])
        thereturn.append(result_v4['data']['repository']['owner']['__typename'])
        thereturn.append(result_v4['data']['repository']['owner']['url'])
        if result_v4['data']['repository']['primaryLanguage'] == None:
            thereturn.append(np.NaN)
        else:
            thereturn.append(result_v4['data']['repository']['primaryLanguage']['name'])
        thereturn.append(result_v4['data']['repository']['pullRequests']['totalCount'])
        thereturn.append(pd.to_datetime(result_v4['data']['repository']['pushedAt']))
        thereturn.append(result_v4['data']['repository']['releases']['totalCount'])
        thereturn.append(result_v4['data']['repository']['stargazers']['totalCount'])
        thereturn.append(pd.to_datetime(result_v4['data']['repository']['updatedAt']))
        thereturn.append(result_v4['data']['repository']['url'])
        thereturn.append(result_v4['data']['repository']['watchers']['totalCount'])
        currentdf = pd.read_csv(githubdatacsv, index_col='project_id')
        existingprojects = currentdf.index.values.tolist()
        if project_id in existingprojects:
            currentdf.loc[project_id] = thereturn[1:]
            currentdf.reset_index(inplace=True)
            currentdf.to_csv(githubdatacsv, encoding='utf-8', index=False)
        else:
            with open(githubdatacsv, 'a', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile, delimiter=',')
                writer.writerow(thereturn)

        langdf = pd.read_csv("dataset/devlangdata/devlanguagesDataExample.csv", index_col='project_id')
        try:
            lang_search = requests.get(result['languages_url'], headers=headers)
            lang_result = lang_search.json()
            existinglangs = list(langdf.columns)
            newlangs = [x for x in list(lang_result.keys()) if x not in existinglangs]
            langdf.loc[result['id']] = pd.Series(lang_result)
            for item in newlangs:
                langdf.loc[result['id'], item] = lang_result[item]
            langdf.reset_index(inplace=True)
            langdf.to_csv("dataset/devlangdata/devlanguagesDataExample.csv", encoding='utf-8', index=False)
        except:
            pass
        return 0

def getGithubdatafromRange_Graphv4(fromN, toN):
    with open("dataset/projectList.txt", 'r', encoding='utf-8') as txtfile:
        projectList = [x.strip('\n') for x in txtfile.readlines()][fromN:toN]
    count = fromN+1
    skipped = []
    for project in projectList:
        print("Project {}".format(count))
        apilimiterror = getGithubMainData2CSV_Graphv4(project, "dataset/githubData.csv")
        if apilimiterror:
            skipped.append(project)
            updateFlag.updateflag("dataset/flag.csv", your_email, 'project', count, toN)
            count = count + 1
            continue
        else:
            updateFlag.updateflag("dataset/flag.csv", your_email, 'project', count, toN)
            count = count + 1
    while True:
        if skipped:
            for project in skipped:
                apilimiterror = getGithubMainData2CSV_Graphv4(project, "dataset/githubData.csv")
                if apilimiterror:
                    continue
                else:
                    skipped.remove(project)
        else:
            break
