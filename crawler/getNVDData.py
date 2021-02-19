"""
version 2.1
@author: Sergio Moreschini, Xiaozhou Li

Main file for scrape from NVD
what we want:
-total number of vulnerabilites,
-severity
-average vulnerabilities of the last 12 months,
-average vuln. total

therefore we need
-date

"""
####################################################### Imports ########################################################
import os
from scripts.updateInfo import your_email, getGithubToken
from prawcore import NotFound
import requests, csv
from scripts import updateFlag

####################################################### Configs ########################################################
#start_time = time.time()
count = 0
github_personal_token = getGithubToken(your_email)
github_token = os.getenv('GITHUB_TOKEN', github_personal_token)
github_headers = {'Authorization': f'token {github_token}'}

####################################################### Functions ######################################################

def check_extra(project_info):
    totalResults = project_info['totalResults']
    resultsPerPage = project_info['resultsPerPage']
    numberOfExtraRequests = int(totalResults/resultsPerPage)
    return numberOfExtraRequests


def check_availability(project_info):
    exists = True
    try:
        project_id = project_info['result']
    except NotFound:
        exists = False
    return exists


def getNVDDataProjectsInRange(fromN, toN):
    with open("dataset/the100k.txt", 'r', encoding='utf-8') as txtfile:
        projectList = [x.strip('\n') for x in txtfile.readlines()][fromN:toN]
    count = fromN + 1
    thereturn = []
    for item in projectList:
        #theProjectQuery = f"https://api.github.com/repos/{item}"
        #p_search = requests.get(theProjectQuery, headers=github_headers)
        #project_info = p_search.json()
        #if "message" in project_info and "documentation_url" in project_info:
        #    print("Project not exist on Github any more. Sad.")
        #    return 0
        #else:
        #    project_id = project_info['id']
        try:
            projecttitle = item.split('/')[1]
            theProjectQuery = f"https://services.nvd.nist.gov/rest/json/cves/1.0?keyword={projecttitle}&resultsPerPage=1000"
            p_search = requests.get(theProjectQuery)
            project_info = p_search.json()
            if projecttitle =='electron':
                print('Check Now!')
            exist = check_availability(project_info)
            #project_id = project_info['id']
            if exist:
                project_result = project_info['result']
                numberOfExtraRequests = check_extra(project_info)
                total_number_of_vulnerabilities = project_info['totalResults']
                listOfCVE = project_info['result']
                listOfCVE = listOfCVE['CVE_Items']
                for item2 in range(total_number_of_vulnerabilities):
                    # need to make a separate CSV file to check all of the single severities
                    temp = listOfCVE[item2]
                    publishedDate = temp['publishedDate']
                    lastModifiedDate = temp['lastModifiedDate']
                    temp = temp['impact']
                    metric3 = temp['baseMetricV3']
                    severity3 = metric3['cvssV3']
                    severity3 = severity3['baseSeverity']
                    metric2 = temp['baseMetricV2']
                    severity2 = metric2['severity']
                    thereturn = [item, item2, publishedDate, lastModifiedDate, severity3, severity2]
                    with open("dataset/nvdData.csv", 'a', encoding='utf-8') as csvfile:
                        writer = csv.writer(csvfile, delimiter=',')
                        writer.writerow(thereturn)
            else:
                print("Project {} NOT exist any more... very sad".format(count))
        except KeyError:
            print(Exception)
            print("Project {} NOT exist any more... very sad".format(count))
        updateFlag.updateflag("dataset/flag.csv", your_email, 'nvd', count, toN)
        count = count + 1
