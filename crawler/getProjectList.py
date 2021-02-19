"""

    This script gets the list of project fullnames based on the query on stars numbers.
    For example, if we want the list of Github projects with stars ranging from 100 to 200
    and save it to testing.txt
    We call function as:
    getProjectListinStarRange('testing.txt', 100, 200):

"""

import os
from pprint import pprint
import requests

personal_token = "Enter Your Github Personal Token Here"
token = os.getenv('GITHUB_TOKEN', personal_token)
headers = {'Authorization': f'token {token}'}

def getPageAmount(thesearchquery):
    page = 1
    while 1 == 1:
        params = {
            "page": page
        }
        r_search = requests.get(thesearchquery, headers=headers, params=params)
        searchresults = r_search.json()
        items = searchresults['items']
        #print(items[0]['id'])
        if len(items) == 0:
            break
        else:
            page = page + 1
    return page-1

def getRepoNameList(txtfilename):
    endingStar = 1000
    startingCondition = f"stars:>={endingStar}"
    theQuery = f"https://api.github.com/search/repositories?q={startingCondition}"
    search_params = {"page": 1}
    while 1==1:
        with open(txtfilename, 'r', encoding='utf-8') as txtread:
            existingList = [x.strip('\n') for x in txtread.readlines()]
        r_search = requests.get(theQuery, headers=headers, params=search_params)
        search_30 = r_search.json()
        try:
            items = search_30['items']
            if len(items)==0:
                break
            else:
                print(len(items))
                starMin = min([x['stargazers_count'] for x in items])
                newCondition = f"stars:{endingStar}..{starMin}"
                theQuery = f"https://api.github.com/search/repositories?q={newCondition}"
                projectList_30 = [x['full_name'] for x in items]
                projectList = [x for x in projectList_30 if x not in existingList]
                with open(txtfilename, 'a', encoding='utf-8') as txtwrite:
                    for project in projectList:
                        txtwrite.write(project+'\n')
        except:
            pprint(search_30)

def getProjectListinStarRange(txtfilename, fromstar, tostar):
    theQuery = f"https://api.github.com/search/repositories?q=stars:{fromstar}..{tostar}"
    page = 1
    while 1==1:
        search_params = {"page": page}
        with open(txtfilename, 'r', encoding='utf-8') as txtread:
            existingList = [x.strip('\n') for x in txtread.readlines()]
        r_search = requests.get(theQuery, headers=headers, params=search_params)
        search_30 = r_search.json()
        try:
            items = search_30['items']
            if len(items)==0:
                break
            else:
                print(len(items))
                starMin = min([x['stargazers_count'] for x in items])
                newCondition = f"stars:{fromstar}..{starMin}"
                theQuery = f"https://api.github.com/search/repositories?q={newCondition}"
                projectList_30 = [x['full_name'] for x in items]
                projectList = [x for x in projectList_30 if x not in existingList]
                if len(projectList)==0:
                    page = page+1
                    continue
                else:
                    with open(txtfilename, 'a', encoding='utf-8') as txtwrite:
                        for project in projectList:
                            txtwrite.write(project+'\n')
                    page = 1
        except:
            pprint(search_30)
            if 'errors' in list(search_30.keys()):
                break
