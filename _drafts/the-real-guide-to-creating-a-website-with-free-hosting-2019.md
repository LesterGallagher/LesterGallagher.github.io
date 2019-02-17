---
title: The real guide to creating a website with free hosting (2019)
image: "/uploads/free-website.png"
date: 2019-02-17 00:00:00 +0100
author: Sem Postma
description: A step by step guide with pictures to easily create a blazing fast static
  website with free hosting using github, cloudflare and namecheap. This guide can
  be used by anyone interested in hosting a static website (blog, personal site, etc.).
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
If you search google for "How to create a free website" you will see a bunch of website builders and websites who will give you a domain like: "yourname.theirname.com" or "theirname.com/yourname". But in this tutorial/guide I will show you the secret to creating a real website completely customizable website. The only payment you will need to do is a 0.89 dollar one year domain

## Step 1

Go to [https://www.namecheap.com/domains/](https://www.namecheap.com/domains/ "https://www.namecheap.com/domains/") and search for a domain name. I would suggest choosing an uncommon domain name try to find one that costs as little as possible. This is probably the best because if you're starting out. You can always buy a more expensive domain later. If you've found a cheap domain it's probably because it's very unique and original so  it's a good thing. One thing to keep in mind though is to keep the domain name as short as possible.

![](/uploads/namecheap.png)

In this example I'm using namecheap but you can use any service you want. If you want to follow along I suggest you buy the domain via namecheap, they provide good pricing and a nice user interface (I'm not sponsored). For example this domain costs 0.88 euro/yr which is about a 1 USD. Click "add to cart", create an account if you haven't already and buy the domain. 

When you're done, go to [https://www.cloudflare.com/](https://www.cloudflare.com/ "https://www.cloudflare.com/"), create an account and add a website:

![](/uploads/cloudflare-add-site.png)

Cloudflare will now fetch your DNS records. If you are not familiar with those, it doesn't matter, you can just click continue until you get to the following dialog:

![](/uploads/cloudflare-nameservers.png)

Go back to your namecheap account (or another domain name provider if you didn't use namecheap). Go to your domain's dashboard and change the nameserver setting to Custom DNS and copy the nameservers values to the values in the cloudflare dialog:

If you're not using namecheap, search for the nameserver setting, there should be a similar setting. If you can't find it, a quick google search often reveals where you can change it.

![](/uploads/namecheap-nameservers.png)