---
title: The real guide to creating a website with free hosting (2019)
image: "/uploads/free-website.png"
date: 2019-02-16T23:00:00.000+00:00
author: Sem Postma
description: A step by step guide with pictures to easily create a blazing fast static
  website with free hosting using github, cloudflare and namecheap. This guide can
  be used by anyone interested in hosting a static website (blog, personal site, etc.).
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''
lang: ''

---
If you search google for "How to create a free website" you will see a bunch of website builders and websites who will give you a domain like: "yourname.theirname.com" or "theirname.com/yourname". But in this tutorial/guide I will show you the secret to creating a real website completely customizable website. The only payment you will need to do is a 0.89 dollar one year domain.

## Step 1

Go to [https://www.namecheap.com/domains/](https://www.namecheap.com/domains/ "https://www.namecheap.com/domains/"){:target="_blank"} and search for a domain name. I would suggest choosing an uncommon domain name. Try to find one that costs as little as possible. This is probably the best because if you're starting out, you can always buy a more expensive domain later. If you've found a cheap domain it's probably because it's very unique and original so it's a good thing. One thing to keep in mind though is to keep the domain name as short as possible.

![](/uploads/namecheap.png)

In this example I'm using namecheap but you can use any service you want. If you want to follow along I suggest you buy the domain via namecheap, they provide good pricing and a nice user interface (I'm not sponsored). For example this domain costs 0.88 euro/yr which is about a 1 USD. Click "add to cart", create an account if you haven't already and buy the domain.

## Step 2

When you're done, go to [https://www.cloudflare.com/](https://www.cloudflare.com/ "https://www.cloudflare.com/"){:target="_blank"}, create an account and add a website:

![](/uploads/cloudflare-add-site.png)

Cloudflare will now get your DNS records. If you are not familiar with those, it doesn't matter, you can just click continue until you get to the following dialog:

![](/uploads/cloudflare-nameservers.png)

Go back to your namecheap account (or another domain name provider if you didn't use namecheap). Go to your domain's dashboard and change the nameserver setting to Custom DNS and copy the nameservers values to the values in the cloudflare dialog:

If you're not using namecheap, search for the nameserver setting, there should be a similar setting. If you can't find it, a quick google search often reveals where you can change it.

![](/uploads/namecheap-nameservers.png)

Go back to cloudflare, click "continue", and wait until cloudflare completes your nameserver setup. This can take a (very) long time. If it's not immediately working just give it an hour's worth of time.

![](/uploads/cname-www.png)

You need to add three records to your DNS table.

1. Add an "A" record by clicking the dropdown in the top left in the above image and give it the name of your domain in my example it's "esstudio.site". Make sure you don't include any slashes or the "https://" part of the url. In the value field, put in "192.30.252.153".
2. Add another "A" record by clicking the dropdown in the top left in the above image and give it the name of your domain in my example it's "esstudio.site". Make sure you don't include any slashes or the "https://" part of the url. In the value field put in "192.30.252.154".
3. Finally, add a CNAME record with the name "www". In the value field, put in the name of your github username plus ".github.io" If you don't have a github account, you can do this after step 3.

For all the records keep the TTL setting at "Automatic TTL".

## Step 3

Next, go to [https://github.com/](https://github.com/ "https://github.com/"){:target="_blank"}, and create an account if you haven't already. Click on the little plus icon in the top right and choose "New repository". You can also go to your repositories and click "New". You will see the following dialog:

![](/uploads/github-create.PNG)

Choose a repository name and description, keep the repository public (it's going to be a public website so it will be public anyway) and click "Create repository".

The following page might be a bit confusing if you're not a programmer or you're not familiar with git(hub) but you need to click the "Create a new file" link/button.

If you know [HTML](https://www.w3schools.com/html/ "https://www.w3schools.com/html/"){:target="_blank"} you can put in the following:

![](/uploads/html-file.png)

Otherwise enter the following:

![A screenshot of an index.md file](/uploads/markdown.png "Markdown")

The above picture shows a markdown file but that's to only thing you need to know. If you don't know anything about HTML or Markdown you can a website called [forestry.io](https://forestry.io/ "https://forestry.io/"){:target="_blank"} to edit and create pages. I'm actually using it right now to write this article.

If you're a programmer, keep in mind that even though this is just a static website hosted on github, a lot of websites nowadays are just static web apps running react or angular which fetch data from an API. You can even use [https://firebase.google.com/](https://firebase.google.com/ "https://firebase.google.com/"){:target="_blank"} for a full [serverless architecture](https://towardsdatascience.com/go-serverless-with-firebase-5348dedb70e9){:target="_blank"} or use something like heroku to create an API. You can use [forestry.io](https://forestry.io/ "https://forestry.io/"){:target="_blank"} as a CMS for your github repositories. It actually commits and pushes your edits to github. You can even use [jekyll](https://jekyllrb.com/ "https://jekyllrb.com/"){:target="_blank"} which has builtin support for sass, coffeescript, markdown and does a lot more. You can even use jekyll to [output data as JSON](https://www.techiediaries.com/how-to-use-jekyll-like-a-pro-output-data-as-json/){:target="_blank"}. I've created an RSS reader using the methods above which can be found here: [https://newsfeeder.esstudio.site/](https://newsfeeder.esstudio.site/ "https://newsfeeder.esstudio.site/"){:target="_blank"}.

## Step 4

The following steps may be confusing but just follow along and copy what I'm doing. Click on the "settings" tab:

![](/uploads/settings.png)

Scroll down until you see the following:

![](/uploads/github-pages.png)

Click the github pages source dropdown and select the "master" branch.

![](/uploads/github-pages-result.png)

You will probably see something like this. Because we want an absolute URL (without the "/my-fast-static-site/" part we go back to the code tab and add a new file:

![](/uploads/cname.png)

Enter the domain name you just purchased. It's important that you don't include any slashes or the "https://" part in the domain name. Save the file and we're done with github.

## Step 5

After completing the previous step, wait a minute and open your domain and see if it's working. If it's not, please leave a message in the comments.

To improve performance and enable SSL and HTTPS, go to back to cloudflare. For non-programmers, if you use HTTPS you're users will see a little security lock next to the URL to show that the page is secure.

![](/uploads/ssl.png)

Click on the crypto icon and enable full SSL.

![](/uploads/https.png)

Scroll down and make sure that "Always Use HTTPS" is selected.

![](/uploads/speed.png)

Click the speed icon. And enable "Auto Minify" of Javascript, CSS and HTML.

![](/uploads/brotli.png)

Scroll down and enable Brotli compression.

![](/uploads/caching-menu.png)

Scroll down and click the caching icon.

![](/uploads/caching.png)

Scroll down and select the Standard caching level. Set the browser cache expiration to 4 hours and make sure that "always online" is set to "On".

And you're done!

To edit you're pages I recommend [forestry.io](https://forestry.io/ "https://forestry.io/"){:target="_blank"}. To get started with foresty.io, click "login" and then "login with github". Import your github repository as a jekyll project and you can start adding pages. If you want to learn more check out the [documentation](https://forestry.io/docs/welcome/ "https://forestry.io/docs/welcome/"){:target="_blank"}.

To change you're website's theme, you can select [these]( "https://pages.github.com/themes/"){:target="_blank"} themes. Click on one of the themes, for example cayman. If you scroll down, you will probably see a "usage" section. You only need to do the first instruction which looks like this in the case of the cayman theme:

Add the following to your site's `_config.yml`:

    theme: jekyll-theme-cayman

## Note to programmers

If you're using a javascript framework or a build tool you can use git to push you're dist folder to the github-pages branch using the steps below. These steps are copied from:  [https://gist.github.com/cobyism/4730490](https://gist.github.com/cobyism/4730490 "https://gist.github.com/cobyism/4730490"){:target="_blank"}.

#### Step 1

Remove the dist directory from the project’s ```.gitignore``` file (it’s ignored by default by Yeoman).

#### Step 2

Make sure git knows about your subtree (the sub folder with your site).

```bash
git add dist && git commit -m "Initial dist subtree commit"
```

#### Step 3

Use subtree push to send it to the gh-pages branch on GitHub.

```bash
git subtree push --prefix dist origin gh-pages
```

Boom. If your folder isn’t called dist, then you’ll need to change that in each of the commands above.