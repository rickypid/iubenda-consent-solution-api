# iubenda-consent-solution-api

API client to implement Iubenda Consent Solution in backend service.

## Install

```bash
npm install iubenda-consent-solution-api
```

This library implements all methods described in Official
Iubenda [Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation).

## Usage

### Instance client

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

### Consents

#### Get Consents

Look Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#list-consents))

```ts
const result = await client.getConsents();
```

#### Get Consent

Look Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#get-consent))

```ts
const id = 'consent-id'
const result = await client.getConsent(id);
```

#### Create Consent

Look Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#create-consent))

```ts
const consent: ConsentExtended = {};//Set your fields
const result = await client.createConsent(consent);
```

### Subjects

#### Get Subjects

Look Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#list-subjects))

```ts
const result = await client.getSubjects();
```

#### Get Subject

Look Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#get-subjects))

```ts
const id = 'subject-id'
const result = await client.getSubject(id);
```

#### Create Subject

Look Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#create-subjects))

```ts
const subject: Subject = {};//Set your fields
const result = await client.createSubject(subject);
```

#### Update Subject

Look Iubenda ([Official Guide](https://www.iubenda.com/en/help/6484-consent-solution-http-api-documentation#update-subjects))

```ts
const id = 'subject-id'
const subject: Subject = {};//Set your fields
const result = await client.updateSubject(subject, id);
```
