import os
import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt
from celery import Celery

app = Celery('tasks', broker='amqp://guest:guest@localhost:5672//', backend='rpc://')
@app.task
def ml():
    image_gen=0
    MIN_MATCH_COUNT = 25
    total_count=0
    # assign directory
    directory1 = '/home/arjun/Desktop/3d-plagiarism-checker/backend/images_model_1'
    directory2 = '/home/arjun/Desktop/3d-plagiarism-checker/backend/images_model_2'
    # iterate over files in
    # that directory
    index=1
    save_as_name=str(index)
    files_scanned=0
    for filename1 in os.scandir(directory1):
        files_scanned=files_scanned+1
        # if filename1.is_file():
        #     print(filename1.path)
        str1=filename1.path
        final1=""
        for i in range(len(str1)):
            final1=final1+str1[i]
        
        # print(str1)
        # print(final1)
        img1 = cv.imread(final1, cv.IMREAD_GRAYSCALE)
        for filename2 in os.scandir(directory2):
                # if filename2.is_file():
                #     print(filename2.path)
                str2=filename2.path
                final2=""
                for j in range(len(str2)):
                     final2=final2+str2[j]
                    # if str2[j]!="\\":
                    #     final2=final2+str2[j]
                    # else:
                    #     final2=final2+"\\\\"
                # print(str2)
                # print(final2)
                img2 = cv.imread(final2, cv.IMREAD_GRAYSCALE)
                sift = cv.SIFT_create()
                # find the keypoints and descriptors with SIFT
                kp1, des1 = sift.detectAndCompute(img1,None)
                kp2, des2 = sift.detectAndCompute(img2,None)
                FLANN_INDEX_KDTREE = 1
                index_params = dict(algorithm = FLANN_INDEX_KDTREE, trees = 5)
                search_params = dict(checks = 50)
                flann = cv.FlannBasedMatcher(index_params, search_params)
                try:
                    matches = flann.knnMatch(des1,des2,k=2)
                except:
                    continue
                # store all the good matches as per Lowe's ratio test.
                good = []
                for m,n in matches:
                    if m.distance < 0.7*n.distance:
                            good.append(m)
                a=0
                if len(good)>=MIN_MATCH_COUNT:
                    image_gen=1
                    src_pts = np.float32([ kp1[m.queryIdx].pt for m in good ]).reshape(-1,1,2)
                    dst_pts = np.float32([ kp2[m.trainIdx].pt for m in good ]).reshape(-1,1,2)
                    M, mask = cv.findHomography(src_pts, dst_pts, cv.RANSAC,5.0)
                    matchesMask = mask.ravel().tolist()
                    h,w = img1.shape
                    pts = np.float32([ [0,0],[0,h-1],[w-1,h-1],[w-1,0] ]).reshape(-1,1,2)
                    dst = cv.perspectiveTransform(pts,M)
                    img2 = cv.polylines(img2,[np.int32(dst)],True,255,3, cv.LINE_AA)
                    a=1
                    print( "Enough matches are found - {}".format(len(good)) )
                else:
                    print( "Not enough matches are found - {}/{}".format(len(good), MIN_MATCH_COUNT) )
                    matchesMask = None
                    a=0



                draw_params = dict(matchColor = (0,255,0), # draw matches in green color
                                singlePointColor = None,
                                matchesMask = matchesMask, # draw only inliers
                                flags = 2)
                img3 = cv.drawMatches(img1,kp1,img2,kp2,good,None,**draw_params)
                if(a==1):
                    # plt.imshow(img3, 'gray'),plt.show()
                    # print(save_as_name)
                    # print(type(save_as_name))
                    cv.imwrite('./results/'+save_as_name+'.jpg', img3)
                    index=index+1
                    save_as_name=str(index)
                    total_count=total_count+1
    result=total_count/files_scanned
    # print(f'{total_count}/{files_scanned}')
    return result,image_gen