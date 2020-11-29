

# 1. importing
import numpy as np
from sklearn.cluster import DBSCAN
import math



# 2. prepare data
#mport pandas as pd
#final_df = pd.read_csv("final_df2.csv")
#v4 = final_df[['X', 'Y', 'days', 'caseNo']].to_numpy()

# 3. get user input
#D = int(input("Inter-location distance threshold: ") or 200)
#T = int(input("Proximity in time threshold: ") or 3)
#C = int(input("Minimum Cluster size: ") or 2)

# 4. clustering functions
def custom_metric(q, p, space_eps, time_eps):
    dist = 0
    for i in range(2):
        dist += (q[i] - p[i])**2
    spatial_dist = math.sqrt(dist)

    time_dist = math.sqrt((q[2]-p[2])**2)

    if time_dist/time_eps <= 1 and spatial_dist/space_eps <= 1 and p[3] != q[3]:
        return 1
    else:
        return 2


def cluster(vector_4d, distance, time, minimum_cluster):
    results=[]
    params = {"space_eps": distance, "time_eps": time}
    db = DBSCAN(eps=1, min_samples=minimum_cluster-1, metric=custom_metric, metric_params=params).fit_predict(vector_4d)

    unique_labels = set(db)
    total_clusters = len(unique_labels) if -1 not in unique_labels else len(unique_labels) -1

  #  print("Total clusters:", total_clusters)

    total_noise = list(db).count(-1)

   # print("Total un-clustered:", total_noise)
    for k in unique_labels:
        result=[]
        if (k != -1):
            labels_k = db == k
            try:
                cluster_k=[]
                for i in range(len(vector_4d)):
                    if (labels_k[i]):
                        cluster_k.append(vector_4d[i])
            except:
            #    print("failed")
                pass
            #print("Cluster", k, " size:", len(cluster_k))
            result.append(k)
            result.append(len(cluster_k))
            cases=[]
            for pt in cluster_k:
                case=[pt[0], pt[1], pt[2], pt[3]]
            #    print("(x:{}, y:{}, day:{}, caseNo:{})".format(pt[0], pt[1], pt[2], pt[3]))
                cases.append(case)
            result.append(cases)

            #print()
            results.append(result)
    return results
