---
layout: compose # this is a layout that allows you to stich together various predefined blocks that comes with the the,e
title: Complex page
description: This layout requires a bit more fiddling as it is stiching together various blocks that all can be customized.
background: /assets/images/moss.jpg
imageLicense: |
  Photo by mhoefft via [gbif.org](https://www.gbif.org/occurrence/1580487687)
height: 70vh
# The general format for these compositions is a list of blocks. Each block has a type and some data that is used by the block template.
# See more examples at https://hp-theme.gbif-staging.org/layout/compose
composition:
- type: heroImage # The type is a template. In this case  a big splashy image with some text on it. The data defines what the image is and what the text is. 
  # data: compose.someFile.someProperty # If no data provided the frontMatter page data will be used instead
- type: pageMarkdown # This block will render the markdown in this file so no data property needed
- type: features # The block type "features" shows a list of cards
  data: examples.couldBeAnyName # We also need some data for those cards. In this case we refer to a yaml file in the _data folder.
- type: split
  data: examples.someOtherNameForSomeData
- type: media # another block type, but this time defining the data inline, instead of in a separate file
  inlineData: 
    title: Great papers you should read
    description: This example shows how you can define the data content inline instead of in a separate file
    features:
      - preTitle: PDF  # optional
        title: Abundantly light years # required
        description: |      # required
          Also, in [for from](/about) winged doesn’t sea creepeth brought be deep abundantly light green they’re living green years.
        # img required
        background: /assets/img/Haeckel_Caulerpa_racemosa.jpeg
        imageLicense: Kunstformen der Natur (1904) by Ernst Haeckel via [Wikimedia](https://commons.wikimedia.org/wiki/Kunstformen_der_Natur)
        href: /about
      - preTitle: Power Point  # optional
        title: Fly moving land
        href: /about
        description: |      # required
          Light green they’re living green years firmament thing fly moving land, divide good spirit you’ll fruitful waters one land us thing a man dry doesn’t created made land man dry i us fruitful replenish said dominion a sixth own it tree.
        background: /assets/img/Haeckel_Caulerpa_racemosa_(uvifera).jpeg
        imageLicense: Kunstformen der Natur (1904) by Ernst Haeckel via [Wikimedia](https://commons.wikimedia.org/wiki/Kunstformen_der_Natur)
---

# Some prose
This content will show because you added the pageMarkdown block to the composition

