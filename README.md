# iubenda-consent-solution-api

[![Test CI](https://github.com/rickypid/iubenda-consent-solution-api/actions/workflows/test.yml/badge.svg)](https://github.com/rickypid/iubenda-consent-solution-api/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/rickypid/iubenda-consent-solution-api/branch/main/graph/badge.svg?token=3100WHBX8W)](https://codecov.io/gh/rickypid/iubenda-consent-solution-api)

API client to implement Iubenda Consent Solution in backend service.

## Install

```bash
npm install iubenda-consent-solution-api
```

This library implements all methods described in Official
Iubenda [Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation).

## Usage

### Client initialization

To be initialized, the IubendaConsentSolution class requires a private API Key, which can be obtained from the dashboard
of your application on [Iubenda](https://www.iubenda.com/).

it is possible to specify whether to use the API in `BETA` mode by setting the optional
parameter `beta: true` [Official Guide](https://www.iubenda.com/en/help/18199-consent-solution-delivery-channels).

Also the "unescape_json" option is supported, you can enable it by setting the optional `unescape_json: true` parameter.

### Client options

| parameter       | required | default |
|-----------------|----------|---------|
| `apiKey`        | `true`   | `---`   |
| `beta`          | `false`  | `false` |
| `unescape_json` | `true`   | `false` |

#### Client options example

```ts
import {IubendaConsentSolution} from 'iubenda-consent-solution-api';

const options = {
  apiKey: 'YOUR-VALID-IUBENDA-API-KEY',
  beta: false,
  unescape_json: false,
};

const client = new IubendaConsentSolution(options);
```

#### Example basic

```ts
import {IubendaConsentSolution} from 'iubenda-consent-solution-api';

const validApiKey = 'YOUR-VALID-IUBENDA-API-KEY';
const client = new IubendaConsentSolution({apiKey: validApiKey});
```

### Request response error

if the request returns an error you will get an object like the following:

```ts
interface ResponseError {
  error: boolean;
  status: number;
  message: string;
}
```

This error is returned if the API server responds with an `HTTP status` >= 300

| field     | description                                  |
|-----------|----------------------------------------------|
| `error`   | always true                                  |
| `status`  | HTTP status (300, 401, ...)                  |
| `message` | Text message received from API HTTP response |

### Rate Limits

By default, you can perform a maximum of `50` requests per second and `108000` requests per hour. Server-side, the API
will respond with `429 Too Many Requests` if these limits are exceeded

### Max Request Size

There is a maximum of `1 MB` per call. Server-side, the API will respond with `413 Request Entity Too Large` if these
limits are exceeded.

### Consents

---

#### Get Consents

Look
Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#list-consents))

```ts
const result = await client.getConsents();
```

<details>
  <summary>Example response HTTP Status 200</summary>

```json
[
  {
    "id": "b04c4b2b-80b7-439f-8997-ade3d35cbb95",
    "timestamp": "2018-06-04T08:11:34.000+00:00",
    "owner": "521686",
    "source": "private",
    "subject": {
      "id": "0e371678-634a-4016-83ce-9b7c36f828e6",
      "email": "83ce_634a_4016_9b7c36f828e6_0e371678@example.com",
      "first_name": "Kianna",
      "last_name": "Fahey",
      "full_name": "Kianna Fahey",
      "verified": false
    },
    "preferences": {
      "newsletter": false
    }
  },
  {
    "id": "ee6644ea-08e9-4aaa-a7a9-18602731a123",
    "timestamp": "2018-06-04T08:11:33.000+00:00",
    "owner": "681109",
    "source": "public",
    "subject": {
      "id": "8c6d1b71-0908-4604-948f-2f706500b5b1",
      "email": "0908.8c6d1b71.2f706500b5b1.4604.948f@example.org",
      "first_name": "Eleanora",
      "last_name": "Adams",
      "full_name": "Eleanora Adams",
      "verified": false
    },
    "preferences": {
      "newsletter": true
    }
  },
  {
    "id": "e7a9f5db-481e-4c80-ac7d-a35e35d37f98",
    "timestamp": "2018-06-04T08:11:33.000+00:00",
    "owner": "178473",
    "source": "private",
    "subject": {
      "id": "d084ab70-0460-4523-94b2-44841055b49c",
      "email": "94b2_4523_44841055b49c_0460_d084ab70@example.com",
      "first_name": "Abbie",
      "last_name": "Heidenreich",
      "full_name": "Abbie Heidenreich",
      "verified": false
    },
    "preferences": {
      "third_party": true
    }
  },
  {
    "id": "e3481085-296c-4b11-a999-73d5d1309128",
    "timestamp": "2018-06-04T08:11:33.000+00:00",
    "owner": "393753",
    "source": "private",
    "subject": {
      "id": "be8ca546-150d-4a6e-b2ac-ef76fb8a279e",
      "email": "b2ac_ef76fb8a279e_150d_4a6e_be8ca546@example.net",
      "first_name": "Grace",
      "last_name": "Dooley",
      "full_name": "Grace Dooley",
      "verified": false
    },
    "preferences": {
      "another_preference_key": false,
      "newsletter": false
    }
  },
  {
    "id": "e1be0320-a854-4b01-a468-49b1752ee4f3",
    "timestamp": "2018-06-04T08:11:33.000+00:00",
    "owner": "629879",
    "source": "public",
    "subject": {
      "id": "f8878254-c7ae-4169-b474-19e90d7b2f4f",
      "email": "f8878254_b474_19e90d7b2f4f_4169_c7ae@example.net",
      "first_name": "Providenci",
      "last_name": "Kulas",
      "full_name": "Providenci Kulas",
      "verified": false
    },
    "preferences": {
      "newsletter": false,
      "random_preference_key": true,
      "third_party": true,
      "another_preference_key": false
    }
  },
  {
    "id": "cbe2bba8-d31d-4a27-9e2d-b38de4f22a68",
    "timestamp": "2018-06-04T08:11:33.000+00:00",
    "owner": "989797",
    "source": "public",
    "subject": {
      "id": "6387dc5d-d474-4da8-8c40-8b197dee8d7c",
      "email": "6387dc5d.4da8.d474.8c40.8b197dee8d7c@example.com",
      "first_name": "Alan",
      "last_name": "Rutherford",
      "full_name": "Alan Rutherford",
      "verified": false
    },
    "preferences": {
      "newsletter": true,
      "random_preference_key": true
    }
  },
  {
    "id": "ca429c28-e1cd-4b95-87ae-48adb8fe56bb",
    "timestamp": "2018-06-04T08:11:33.000+00:00",
    "owner": "885846",
    "source": "public",
    "subject": {
      "id": "b2ad578d-0aa9-4bd5-becd-e2e7a2019e7a",
      "email": "b2ad578d.becd.e2e7a2019e7a.0aa9.4bd5@example.net",
      "first_name": "Ruby",
      "last_name": "Lemke",
      "full_name": "Ruby Lemke",
      "verified": false
    },
    "preferences": {
      "third_party": true,
      "random_preference_key": false
    }
  },
  {
    "id": "bf12770e-840a-40cd-ab79-5d88576b6b73",
    "timestamp": "2018-06-04T08:11:33.000+00:00",
    "owner": "369168",
    "source": "public",
    "subject": {
      "id": "d4f24d92-56c2-4372-8696-fec829da5ccc",
      "email": "fec829da5ccc.8696.4372.56c2.d4f24d92@example.com",
      "first_name": "Hank",
      "last_name": "Klein",
      "full_name": "Hank Klein",
      "verified": false
    },
    "preferences": {
      "newsletter": false
    }
  },
  {
    "id": "b489e2d4-2fc6-44e1-ba54-e5f81000d30a",
    "timestamp": "2018-06-04T08:11:33.000+00:00",
    "owner": "781022",
    "source": "public",
    "subject": {
      "id": "38bc623f-b386-4b66-8ee6-5e7d91c19800",
      "email": "38bc623f.8ee6.4b66.5e7d91c19800.b386@example.net",
      "first_name": "Kamren",
      "last_name": "Pacocha",
      "full_name": "Kamren Pacocha",
      "verified": false
    },
    "preferences": {
      "newsletter": true
    }
  },
  {
    "id": "b2ec7aa8-35e7-470c-8b51-bd39fa686a3a",
    "timestamp": "2018-06-04T08:11:33.000+00:00",
    "owner": "527898",
    "source": "public",
    "subject": {
      "id": "0cc94c66-d9eb-4ace-af3d-1d48fba265f9",
      "email": "1d48fba265f9_4ace_af3d_d9eb_0cc94c66@example.net",
      "first_name": "Maryjane",
      "last_name": "Wiegand",
      "full_name": "Maryjane Wiegand",
      "verified": false
    },
    "preferences": {
      "newsletter": true
    }
  }
]
```

</details>

---

#### Get Consent (With specific `ID`)

Look
Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#get-consent))

```ts
const id = 'consent-id'
const result = await client.getConsent(id);
```

<details>
  <summary>Example response HTTP Status 200</summary>

```json
{
  "id": "de801ca9-abec-45e2-8f7c-729822cfffad",
  "timestamp": "2018-05-04T14:52:26Z",
  "checksum": "336dd0c5ee2253794b8cca6ee2b2fec835ab25a7097c4405014d02e4ffe4d5e5",
  "owner": "1",
  "subject": {
    "id": "custom_subject_id",
    "owner_id": "1",
    "email": "subject@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "verified": false
  },
  "preferences": {
    "privacy_policy": true,
    "newsletter": false
  },
  "legal_notices": [
    {
      "identifier": "privacy_policy",
      "version": 123
    },
    {
      "identifier": "term",
      "version": 123
    }
  ],
  "proofs": [
    {
      "content": "proof_1",
      "form": "proof_1 form"
    },
    {
      "content": "proof_2",
      "form": "proof_2 form"
    }
  ],
  "ip_address": null
}
```

</details>

---

#### Create Consent

Look
Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#create-consent))

```ts
const consent: ConsentExtended = {};//Set your fields
const result = await client.createConsent(consent);
```

<details>
  <summary>Example response HTTP Status 200</summary>

```json
{
  "id": "de801ca9-abec-45e2-8f7c-729822cfffad",
  "timestamp": "2018-05-04T14:52:26Z",
  "subject_id": "testsubject"
}
```

</details>

---

### Subjects

---

#### Get Subjects

Look
Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#list-subjects))

```ts
const result = await client.getSubjects();
```

<details>
  <summary>Example response HTTP Status 200</summary>

```json
[
  {
    "id": "d2a55da5-0777-4625-94bd-b69948703e71",
    "owner_id": "131132",
    "email": "rath.jorge@example.com",
    "first_name": "Jorge",
    "last_name": "Rath",
    "full_name": "Jorge Rath",
    "preferences": null,
    "verified": true,
    "timestamp": "2018-09-12T16:22:21+00:00"
  },
  {
    "id": "b75c6d0c-550f-4f84-9e92-2f351d481220",
    "owner_id": "131132",
    "email": "aufderhar_alfonso@example.net",
    "first_name": "Alfonso",
    "last_name": "Aufderhar",
    "full_name": "Alfonso Aufderhar",
    "preferences": null,
    "verified": true,
    "timestamp": "2018-09-12T16:22:21+00:00"
  },
  {
    "id": "a9c8c720-cb07-4a52-81c3-7cb7fb4f877e",
    "owner_id": "131132",
    "email": "vandervort.furman@example.net",
    "first_name": "Furman",
    "last_name": "Vandervort",
    "full_name": "Furman Vandervort",
    "preferences": null,
    "verified": true,
    "timestamp": "2018-09-12T16:22:21+00:00"
  },
  {
    "id": "6ccc2802-3bcb-49af-a4c5-14dc89ba94bc",
    "owner_id": "131132",
    "email": "alvis.rohan@example.org",
    "first_name": "Alvis",
    "last_name": "Rohan",
    "full_name": "Alvis Rohan",
    "preferences": null,
    "verified": true,
    "timestamp": "2018-09-12T16:22:21+00:00"
  },
  {
    "id": "5900f856-619e-42b0-92a5-b2ebd016ac01",
    "owner_id": "131132",
    "email": "brown.marlee@example.net",
    "first_name": "Marlee",
    "last_name": "Brown",
    "full_name": "Marlee Brown",
    "preferences": null,
    "verified": true,
    "timestamp": "2018-09-12T16:22:21+00:00"
  }
]
```

</details>

---

#### Get Subject (With specific `ID`)

Look
Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#get-subjects))

```ts
const id = 'subject-id'
const result = await client.getSubject(id);
```

<details>
  <summary>Example response HTTP Status 200</summary>

```json
{
  "id": "testsubject",
  "owner_id": "1",
  "email": "subject@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "verified": false,
  "preferences": {
    "privacy_policy": {
      "value": true,
      "consent_id": "de801ca9-abec-45e2-8f7c-729822cfffad"
    },
    "newsletter": {
      "value": true,
      "consent_id": "de801ca9-abec-45e2-8f7c-729822cfffad"
    }
  }
}
```

</details>

---

#### Create Subject

Look
Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#create-subjects))

```ts
const subject: Subject = {};//Set your fields
const result = await client.createSubject(subject);
```

<details>
  <summary>Example response HTTP Status 200</summary>

```ts
//Empty response
```

</details>

<details>
  <summary>Example response BETA HTTP Status 200</summary>

```json
{
  "id": "testsubject",
  "email": "subject@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "full_name": "John Doe",
  "verified": false
}
```

</details>

---

#### Update Subject

Look
Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#update-subjects))

```ts
const id = 'subject-id'
const subject: Subject = {};//Set your fields
const result = await client.updateSubject(subject, id);
```

<details>
  <summary>Example response HTTP Status 200</summary>

```ts
//Empty response
```

</details>

<details>
  <summary>Example response BETA HTTP Status 200</summary>

```json
{
  "first_name": "Mary",
  "verified": true
}
```

</details>

---
