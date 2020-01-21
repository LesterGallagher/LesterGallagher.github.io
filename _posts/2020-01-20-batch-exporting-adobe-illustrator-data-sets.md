---
lang: en
layout: post
title: Batch exporting Adobe Illustrator data sets
image: "/uploads/adobe-illustrator-cc.svg"
date: 2020-01-20 00:00:00 +0100
author: Sem Postma
description: Bath export data-driven documents with large data sets.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''
---
_Important: Data sets should not have invalid characters for filenames like:_ \\ / : * ? " < > |

* Open a random document
* Create a new "Save" action where you simply save the file as a pdf document, _Don't forget to uncheck "View PDF after saving"_
* Select the action and click on hamburger button (the 3 horizontal lines) in the top right, click "Batch"
* Select your "Save" action
* Choose "Data Sets" as the source (you should see "No options available")
* Choose a desetination
* Check Override Action "Save" Command
* File Name: Choose either File + Data Set Name or Data Set Name. _Make sure your dataset names have valid filename characters so none of these: \\ / : * ? " < > |_
* Click "Ok"

If you're getting this error: `current values have not been captured and will be discarded upon switching data sets. Proceed?`, please refer to ["Clean data sets"](#clean-data-sets)

{% include adsense.html %}

## Clean data sets

* Download the following script: [https://gist.github.com/sempostma/30ea44b8fbce7033752cb80b8eb1ffb1/archive/d1405b86decd4c4462e5ca224c8506d62cdb3ad4.zip](https://gist.github.com/sempostma/30ea44b8fbce7033752cb80b8eb1ffb1/archive/d1405b86decd4c4462e5ca224c8506d62cdb3ad4.zip "https://gist.github.com/sempostma/30ea44b8fbce7033752cb80b8eb1ffb1/archive/d1405b86decd4c4462e5ca224c8506d62cdb3ad4.zip")
* Open the zip file, you should find a "Clean Datasets.jsx" file.
* Copy the file to C:\\Program Files\\Adobe\\Adobe Illustrator CC 2019\\Presets\\<your locality>\\Scripts or the equivalent script folder for your operating system.
* Restart Illustrator
* Run: "File->Scripts->Clean Datasets"

**Source:**

{% gist 30ea44b8fbce7033752cb80b8eb1ffb1 %}