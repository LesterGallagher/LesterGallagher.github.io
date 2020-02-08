---
lang: en
layout: post
title: Authenticating Firebase JWT Tokens
image: "/uploads/OAuth 2.0.png"
date: 2020-02-07 00:00:00 +0100
author: Sem Postma
description: Verify and decode Firebase JWT tokens using node.js without dependencies.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''
ref: authenticating-firebase-jwt-tokens

---
There might be circumstances where you would want to verify if a certain user is authenticated with firebase.

You don't need the firebase admin module to verify and decode firebase JWT tokens. In the example below you can find a full implementation of this. In the example below I'm only using the default node.js modules http, https and crypto

{% gist b5b6492ddb805d71daa5e60f32c7788c %}

{% include adsense.html %}

### Example response JSON

```json
{
    "data": {
        "iss": "https://securetoken.google.com/<project_id>",
        "aud": "<project_id>",
        "auth_time": 1581009428,
        "user_id": "9jnxi9kmz76ajnc4do47emrk8s1s",
        "sub": "9jnxi9kmz76ajnc4do47emrk8s1s",
        "iat": 1581082417,
        "exp": 1581086017,
        "email": "test@example.com",
        "email_verified": true,
        "firebase": {
            "identities": {
                "email": [
                    "test@example.com"
                ]
            },
            "sign_in_provider": "password"
        }
    }
}
```

You can optionally check if the "iss" value is equal to "https://securetoken.google.com/<your_project_id>" to assure the user is signed with a specific firebase project.

