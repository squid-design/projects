---
layout: whitepaper
title: Machine Learning and Artificial Intelligence Applications for Quality Control in Craft Beer
short_title: Identifying Flaws in Beer
short_description: Flaw detection and identification
subtitle:  Flaw Detection and Identification
snippet: Using Gastrograph, models have been made for the identification of flaws in beer.  Applying a random forest model to sensory data from several brands of beer spiked with the 20 most common beer flaws, taints, and contaminations allows us to reliably flag and identify these compounds in regularly available beer.
tags: random_forest feed-foward_perceptron_networks deep-neural_networks SVMs
date: 2015-06-16 16:52:01
author:
  - Yuqi Zhou
  - Zachary Bushman
  - Jason Cohen
description: Flaw Detection and Identification in Beer
---
####1. Introduction
Standard human sensory evaluation for quality control applications is costly, requiring time, resources, and skills to successfully implement such a program. Analytical Flavor Systems (AFS) has developed an affordable quality control tool through a unique application of machine learning and artificial intelligence capable of detecting and identifying specific flaw-compounds using human sensory data. In standard sensory-based quality control, the individual panelists are often rigorously trained and may be highly specialized. Each panelist should have knowledge of the styles of beer that the brewery makes and the minimum quality each beer needs to meet in order to be shipped. The panelists themselves should have experience tasting common flavors, ingredients, and flaw-compounds in beer. These panelists must be periodically retrained on every flaw for a specific style by spiking beer samples. This acts as a calibration method for the panelists.

Gastrograph Review for iOS and Android is used for the collection of sensory and environmental data during blind and double blind tastings on beer spiked with one or more combinations of flaw-compounds. The computer then builds its own internal model to judge the beer by the flavors the panelists have indicated. Further training with more data improves the accuracy of the model to six-sigma accuracy for the detection and identification of flaws, taints, contaminations, and batch-to-batch deviations in seven of the most common styles of beer and above 90% accuracy in other common styles. Human judgement is far less accurate than our machine learning and artificial intelligence models, on average, as humans are more prone to misidentification, palate fatigue, and cognitive effect – often caused by exogenous factors. Machine learning and artificial intelligence models are not subject to these failings of perception and operate without bias on deep flavor signatures hidden within the product’s flavor profile.

The Gastrograph System significantly simplifies quality control through automated collection and testing of your panelists’ sensory data. Our models detect and identify the twenty most common flaw-compounds in beer through high-dimensional flavor signatures without any individual panelist needing to recognize and identify flaws themself.

####2. Experimental Design

The experiment was designed to train and test machine learning and artificial intelligence models for flaw detection in seven styles of beer: Pale Ale, Indian Pale Ale, Brown Ale, Stout, Pilsner, and Doppelbock.  The beers chosen to represent each style were representative of the average flavor profile from that style. Each style of beer was then individually spiked with one or more combinations of flaws and contaminations for each of the 20 most common flaws in beer. These specific flaw-compounds are listed in Table 1 below.  The beers used for the tastings were each tested before the flaw-compound was added to ensure the base beer was a usable standard. Using already tainted beer for these tasting panels would introduce an unknown variable, skewing the results and making the models less accurate.

Tastings were held nightly Monday through Friday at approximately 6:00 PM EST.  Tasters were selected from a pool of employees at AFS and volunteer professionally trained tasters from the Tea Institute at Penn State.  Due to the extended nature of this study, the group of tasters varied between tastings – a variation easily handled by our hierarchical data analysis and other artificial intelligence models. Groups varied from 7 to 30 tasters with at least one representative from each gender, multiple ethnicities, multiple levels of tasting experience, a range of ages from 21 to 60, and multiple nationalities.

#####Table 1: The 20 most common flaws, taints, and contaminations in beer as determined by Flavoractiv.  Shown are the products under the names which Flavoractiv sells them, the identities of the compounds of interest, flavor notes, and the flavor thresholds for each flaw.
<table class="blog-table table table-striped table-hover">
  <tr>
    <th>Product Name</th>
    <th>Compound</th>
    <th>Flavor Notes</th>
    <th>Flavor Threshold</th>
  </tr>
  <tr>
    <td>Acetaldehyde</td>
    <td>Acetaldehyde</td>
    <td>Aldehydic, bruised apples, emulsion, paint</td>
    <td>5-15 ppm</td>
  </tr>
  <tr>
    <td>Acetic</td>
    <td>Acetic acid</td>
    <td>Acid, vinegar, pungent, sherry-like</td>
    <td>90 ppm</td>
  </tr>
  <tr>
    <td>Butyric</td>
    <td>Butyric acid</td>
    <td>Rancid, baby sick, putrid</td>
    <td>2-3 ppm</td>
  </tr>
  <tr>
    <td>Caprylic</td>
    <td>Octanoic acid</td>
    <td>Goaty, waxy, tallowy</td>
    <td>4-6 ppm</td>
  </tr>
  <tr>
    <td>Catty</td>
    <td>p-menthane-8-thiol-3-one</td>
    <td>Blackcurrant leaves, ribes, tom-cat urine</td>
    <td>15 pptrillion</td>
  </tr>
  <tr>
    <td>Diacetyl</td>
    <td>Diacetyl</td>
    <td>Buttery, butterscotch, milky</td>
    <td>10-40 ppb</td>
  </tr>
  <tr>
    <td>DMS</td>
    <td>Dimethyl sulfide</td>
    <td>Sweet corn, creamed corn, cooked vegetables, tomato sauce, sea vegetables</td>
    <td>25 ppb</td>
  </tr>
  <tr>
    <td>Ethyl butyrate</td>
    <td>Ethyl butyrate</td>
    <td>Tropical fruits, mango, tinned pineapple</td>
    <td>400 ppb</td>
  </tr>
  <tr>
    <td>Ethyl hexanoate</td>
    <td>Ethyl hexanoate</td>
    <td>Estery, apple, aniseed</td>
    <td>200 ppb</td>
  </tr>
  <tr>
    <td>Freshly-cut grass</td>
    <td>Cis-3-hexenol</td>
    <td>Leafy, grassy, crushed green leaves, hedge clippings</td>
    <td>15 ppm</td>
  </tr>
  <tr>
    <td>Geraniol</td>
    <td>Geraniol</td>
    <td>Rose-like, floral, flower-like</td>
    <td>1/3 of population: 18 ppb <br> 2/3 of population: 350 ppb</td>
  </tr>
  <tr>
    <td>Grainy</td>
    <td>2-methyl propionaldehyde</td>
    <td>Green malt character, green, harsh</td>
    <td>10 ppb</td>
  </tr>
  <tr>
    <td>H2S</td>
    <td>Hydrogen sulfide</td>
    <td>Sulfidic, rotten eggs</td>
    <td>4 ppb</td>
  </tr>
  <tr>
    <td>Hop oils</td>
    <td>Hop oils</td>
    <td>Hoppy</td>
    <td>160 ppb</td>
  </tr>
  <tr>
    <td>Isoamyl acetate</td>
    <td>Isoamyl acetate</td>
    <td>Estery, fruity, banana, pear-drop</td>
    <td>1.4 ppm</td>
  </tr>
  <tr>
    <td>Light-struck</td>
    <td>3-methyl-2-butene-1-thiol</td>
    <td>Skunky, light-struck</td>
    <td>4 pptrillion</td>
  </tr>
  <tr>
    <td>Mercaptan</td>
    <td>Ethanethiol</td>
    <td>Drains, rotten vegetables, leeks, natural gas, durian</td>
    <td>1 ppb</td>
  </tr>
  <tr>
    <td>Metallic</td>
    <td>Ferrous sulfate</td>
    <td>Inky, blood-like, tinny</td>
    <td>1 ppm</td>
  </tr>
  <tr>
    <td>Papery</td>
    <td>Trans-2-nonenal</td>
    <td>Cardboard, oxidized</td>
    <td>50-100 pptrillion</td>
  </tr>
  <tr>
    <td>Phenolic</td>
    <td>4-vinyl guaiacol</td>
    <td>Spicy, herbal, clove-like</td>
    <td>200 ppb</td>
  </tr>
  <tr>
    <td>Sour</td>
    <td>Citric acid</td>
    <td>Acidic, lemon, sour, sour milk</td>
    <td>170 ppm</td>
  </tr>
</table>

A minimum of five un-spiked beers we’re included per style in order to provide a baseline for the study. The spiked beer was flawed by adding a precise amount of the flavor active compound to a specific amount of beer. A range of concentrations were selected per flaw, with the majority of tests set such that the concentration was above the flavor threshold of the compound. Panelists were not told which flaw, if any, was present in the beer, or if there was a flaw at all.  Each taster received 2-3 fl. oz. of the beer to taste and review with the Gastrograph™ Review app. To avoid palate fatigue that would skew results, tastings were limited to two trials per round of tastings. This data was then analyzed and models were built using a randomized 70% of the data as a training set, and the remaining 30% as a hold-out validation set.

####3. Algorithm and Method

Analytical Flavor Systems monitors clients’ products for flaws, taints, contaminations, and batch-to-batch deviations in real time. AFS’s algorithms run constantly to protect clients from shipping a bad batches that may hurt their brand. Clients are alerted to any significant quality control problems, change in flavor profile, or drop in quality through email, SMS text message, and phone alerts. The data from the study described above will show how the AFS algorithms can detect any natural combination of the 20 most common flaws in the beer.

Clients review each batch of their product at regular control points (fermentation finished, bright tank, packaging), assigning each a score between 0 and 5 to each of 24 universal flavor dimensions and an overall perceived quality (PQ) score between 1 and 7. In this study % alcohol by volume (ABV), the style of the beer, environmental data, and review data were also collected as attributes; approximately 400 - 600 variables we’re collected per review, depending on the device used.

Our artificial intelligence and machine learning model for flaw identification and prediction uses an ensemble approach, combining multiple models and model-chaining including random forest, feed-forward perceptron networks, and deep-neural networks, and SVMs. The deviation-threshold parameter is set per-flaw using the average demographic tasting-population’s sensitivity for each specific style of beer.

As an illustrative example case, we will show the construction of a sample model using random forest capable of 90%+ accuracy. Random forest operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees. Random forests correct for decision trees' tendency of over-fitting to their training set by training thousands to millions of trees per model, and pruning the least predictive set of nodes.

{% picture post-images post-images/whitepapers/identifying-flaws-in-beer/decision-tree.png "" %}

The above is an example of a single decision tree within the random forest model. A forest is made up of many trees, and there are more than 250,0000 trees and more than 1,000,000 decision nodes generated by this sample model. To construct each tree in the forest, the model will randomly choose any \\(m\\) attributes of total \\(M\\) attributes to form a decision tree \\(N\\) times, where \\(m\\) is the number of variables per tree, \\(M\\) is the total number of variables collected, and \\(N\\) is the number of trees built by the model. Then according to the attributes of each tree, the tree will give a decision.

In this decision tree, if the ABV of a specific beer is no higher than 4.5% and the score of dry is no greater than 1, the computer will decide the beer is contaminated with diacetyl. And if the beer has the attribute that ABV is no greater than 4.5, the score of dry is greater than 1, the score of sugar is no greater than 2, the score of bitter is no greater than 2, and the score of marine is 0, the computer will decide the beer is contaminated with mercaptan.

However, each single decision tree will be over-fitting and inaccurate. Then the whole forest will make a decision based on all of the weighted-model-average decisions by these trees.

In terms of preprocessing for this random forest model, we adopt “center and scale”, the transformation for “center and scale” is as following:

\\[x = {(x -\bar x) \over \sigma_x}\\]

Where \\(\bar x\\) is the average of \\(x\\) and \\(\sigma_x\\) is the standard deviation of \\(x\\).

Across the entire model, we will be tuning the parameters \\(“mtry”\\) and \\(“ntry”\\) to decide the best model with highest accuracy for finding specific flaw-compounds. \\(“mtry”\\) stands for the number of variables randomly sampled as candidates at each split, and \\(“ntry”\\) stands for the number of trees to grow.

To improve the accuracy of identify the flawed beer, we preprocess the data with a metric learning function. In general cases we use either Euclidean distance or the Mahalanobis distance as a metric to calculate the similarity between two different objects:

<div class="text-center" style="margin-bottom: 26px;">Euclidean distance: \(\; \left\lVert x_1 - x_j \right\rVert_2 = \sqrt { (x_i - x_j)^T (x_i - x_j) }\)</div>

<div class="text-center" style="margin-bottom: 16px;">Mahalanobis distance: \(\; d_{Mahal} (x_i,x_j) = \sqrt { (x_i - x_j)^T \sum^{-1} (x_i - x_j)}\)</div>

However, Euclidean distances and Mahalanobis distances are not optimized measures of the sensorially perceivable distance within N-dimensional flavor-space, where \\(N\\) is a finite-reduction of infinite-dimensional Hilbert space. The following form of “Mahalanobis distance” is often used to denote any generalized distance function:

\\[d_A (x, y) = (x-y)^T A(x - y)\\]

where \\(A\\) is some positive semi-definite matrix. As with the original Mahalanobis distance, we can view this function as applying a linear transformation of the input data, since \\(A\\) is positive semi-definite. We factorize it as:

\\[A = G^T G\\]

and simple algebraic manipulations show:

\\[d_A (x, y) = \lVert Gx - Gy\rVert _2^2 \\]

Thus, this generalized notion of a Mahalanobis distance exactly captures the idea of learning a global linear transformation, which is equivalent to learning the quantitative perceived distance between changes in flavor profile or the difference caused by the addition of flaws.

There are multiple methods for calculating the transformation matrix \\(G\\); in this model we have used the Linear Local Fisher Discriminant Analysis (LFDA). LFDA is the combination of Fisher Discriminant Analysis (FDA) and Locality-Preserving Projection (LPP).

The goal of FDA is to find a transformation matrix which will maximize the between-class distance and minimize the within-class distance in the new data space. However, FDA may perform poorly if samples in a class form several separate clusters. In other words, the undesired behavior is caused by the globality when evaluating within-class scatter and between-class scatter. On the other hand, LPP can make samples of different classes overlapped if they are close in the original high-dimensional space. LFDA which combines FDA and LPP has been adopted for our project.

####4. Results

The first step in the identification of flaws in a beer is detecting that a flaw(s) is/are present.  For this, the dataset includes data from beer contaminated with mercaptan, butyric acid, DMS, ethyl hexanoate and trans-2-nonenal as well as the non-flawed beer. Figure 1 below is the visualization of the training and test sets for the recognition of a flaw. The Visualization below shows the post-metric-learning transformation and classification in the training set and testing set, where the red points are the contaminated beer, and the black points are the standard – this visualization clearly shows the veracity and capability of metric learning, through the increase in distance between the two classes (flawed and standard).

{% picture post-images post-images/whitepapers/identifying-flaws-in-beer/figure-1.png "Figure 1: The visualization for the flaw and non-flaw model." %}

Once the beer has been flagged as deviant and flawed, the specific flaw must be identified. Take the flaw mercaptan for example; Figure 2 shows mercaptan vs non-flawed beer. The visualization of the training and testing sets for the identification of 5 flaws are shown below. 

{% picture post-images post-images/whitepapers/identifying-flaws-in-beer/figure-2.png "Figure 2: The visualization for mercaptan and non-flawed beer." %}

The five different flaws mentioned above can then be classified in to five different classes. The following figure (Figure 3) contains the visualizations for the differentiation between five different flaws.

{% image post-images post-images/whitepapers/identifying-flaws-in-beer/figure-3.gif "Figure 3: The visualization of flaw identification for five different flaws" %}

The five flaw beers can then be identified and differentiated from the non-flawed beer then placed into one of six classes.  This is shown in Figure 4 below.

{% image post-images post-images/whitepapers/identifying-flaws-in-beer/figure-4.gif "Figure 4: The visualization for five flaw-beer classes and a non-flaw beer class" %}

The accuracy for these techniques is illustrated in Table 2.

#####Table 2: Accuracy for each step of flaw detection and classification for the techniques described above.
<table class="blog-table table table-striped table-hover">
  <tr>
    <th>Flaw Classification Step</th>
    <th>Training Accuracy</th>
    <th>Test Accuracy</th>
  </tr>
  <tr>
    <td>General flaw detection</td>
    <td>0.921</td>
    <td>0.917</td>
  </tr>
  <tr>
    <td>Identification of mercaptan</td>
    <td>0.94</td>
    <td>0.917</td>
  </tr>
  <tr>
    <td>Classification as one of five flaws</td>
    <td>0.921</td>
    <td>0.943</td>
  </tr>
  <tr>
    <td>Classification as one of five flaws and non-flawed beer</td>
    <td>0.915</td>
    <td>0.9</td>
  </tr>
</table>

####5. Conclusion and Discussion

This paper shows that the sample random forest model works for the identification of these flaw compounds at a high degree of accuracy.  Furthermore, this paper should be understood as a proof of concept – the models used in production for our clients are more advanced and arcuate implementations, utilizing a group of models in an ensemble approach.

This paper should also be considered as a starting point for the baseline application of random forest, as a greater number of trees will dramatically increase the accuracy of the models for flaw detection.  This method can be applied to the flaws illustrated as well as any of the other common flaws discussed. Basic steps to further improve accuracy include applying other metric learning or pre-processing methods, collecting more data for each flaw, and more data for different styles and types of beer.  By increasing the amount of training data, the models will become more accurate in aggregate. By increasing the brands and styles of beer used in testing, the models will become more usable for all beer.

In conclusion, this paper shows that machine learning and artificial intelligence can be used to detect specific flaw-compounds in a variety of beer styles at a greater level of sensitivity than standard sensory panel techniques.
