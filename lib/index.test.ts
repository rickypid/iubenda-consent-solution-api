import {expect} from 'chai';
import {IubendaConsentSolution, Subject} from '~/index';

function validApiKey(): string {
  return process.env.API_KEY || 'YOUR-VALID-IUBENDA-API-KEY';
}

function invalidApiKey(): string {
  return 'invalid';
}

//Test constants
const first_name = 'John';
const first_name_update = 'Jonathan';
const last_name = 'Fix';
const testEmailDomain = '@test.it';

function generateId(): string {
  return 'test-' + Date.now().toString();
}

function generateEmailFromId(id: string): string {
  return id + testEmailDomain;
}

describe('iubenda-consent-solution-api', function () {
  describe('API Key check', function () {
    it('Invalid API Key', async function () {
      const client = new IubendaConsentSolution({apiKey: invalidApiKey()});
      const result = await client.getConsents();
      if ('error' in result)
        expect(result.error).equal(true);
      else
        expect.fail('Private key is valid!');
    });
    it('Valid API Key', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey()});
      const result = await client.getConsents();
      if ('error' in result)
        expect.fail('Private key is invalid!');
      else
        expect(true);
    });
  });

  describe('Subjects', function () {
    it('Get Subjects', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey()});
      const result = await client.getSubjects();
      if ('error' in result)
        expect.fail('Response error! ' + result.message);
      else
        expect(true);
    });
    it('Get Subject with id', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey()});
      const result = await client.getSubjects();
      if ('error' in result)
        expect.fail('Response error! ' + result.message);
      if (result.length > 0 && result[0].id) {
        const result1 = await client.getSubject(result[0].id);
        if ('error' in result1)
          expect.fail('Response error! ' + result1.message);
        else
          expect(true);
      } else
        expect.fail('Subjects empty!');
    });
    it('Create Subject', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey()});
      const id: string = Date.now().toString();
      const result = await client.createSubject({
        id: id,
        email: id + testEmailDomain,
        first_name: first_name,
        last_name: last_name,
      });
      if ('error' in result)
        expect.fail('Response error! ' + result.message);
      else
        expect(true);
    });

    it('Update Subject', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey()});
      const id: string = generateId();
      const subject:Subject = {
        id: id,
        email: generateEmailFromId(id),
        first_name: first_name,
        last_name: last_name,
      };
      const result = await client.createSubject(subject);
      if ('error' in result)
        expect.fail('Response error! ' + result.message);
      subject.first_name = first_name_update;
      const result1 = await client.updateSubject(subject, id);
      if ('error' in result1)
        expect.fail('Response error! ' + result1.message);
      else
        expect(true);
    });
  });
  describe('Consents', function () {
    it('Get Consents', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey()});
      const result = await client.getConsents();
      if ('error' in result)
        expect.fail('Response error! ' + result.message);
      else
        expect(true);
    });
    it('Get Consent with id', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey()});
      const result = await client.getConsents();
      if ('error' in result)
        expect.fail('Response error! ' + result.message);
      if (result.length > 0 && result[0].id) {
        const result1 = await client.getConsent(result[0].id);
        if ('error' in result1)
          expect.fail('Response error! ' + result1.message);
        else
          expect(true);
      } else
        expect.fail('Consents empty!');
    });
    it('Create Consent', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey()});
      const id: string = generateId();
      const result = await client.createConsent({
        autodetect_ip_address: 'false',
        subject: {
          id: id,
          email: generateEmailFromId(id),
          first_name: first_name,
          last_name: last_name,
        },
        legal_notices: [
          {identifier: 'privacy_policy', version: '1'},
          {identifier: 'terms_and_conditions', version: '1'},
          {identifier: 'cookie_policy'},
        ],
        proofs: [
          {
            content: '{}',
            form: '<form>Example Form</form>',
          },
        ],
        preferences: {
          privacy_policy: 'true',
          terms_and_conditions: 'true',
          cookie_policy: 'true',
          newsletter_subscription: 'false',
        },
        ip_address: '',
      });
      if ('error' in result)
        expect.fail('Response error! ' + result.message);
      else
        expect(true);
    });
  });

});