import {expect} from 'chai';
import {IubendaConsentSolution} from '~/index';

const validApiKey = process.env.API_KEY || 'YOUR-VALID-IUBENDA-API-KEY';
const invalidApiKey = 'invalid';

describe('iubenda-consent-solution-api', function () {
  describe('API Key check', function () {
    it('Invalid API Key', async function () {
      const client = new IubendaConsentSolution({apiKey: invalidApiKey});
      const result = await client.getConsents();
      if ('error' in result)
        expect(result.error).equal(true);
      else
        expect.fail('Private key is valid!');
    });
    it('Valid API Key', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey});
      const result = await client.getConsents();
      if ('error' in result)
        expect.fail('Private key is invalid!');
      else
        expect(true);
    });
  });
  describe('Consents', function () {
    it('Get Consents', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey});
      const result = await client.getConsents();
      if ('error' in result)
        expect.fail('Response error! ' + result.message);
      else
        expect(true);
    });
    it('Get Consent with id', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey});
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

    //ToDo implements createConsent()
    it('Add Consent', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey});
      const result = await client.createConsent({
        autodetect_ip_address: 'false',
        subject: {
          id: '1',
          email: 'test@test.it',
          first_name: 'John',
          last_name: 'Fix',
        },
        legal_notices: [
          {identifier: 'privacy_policy',version: '1'},
          {identifier: 'terms_and_conditions',version: '1'},
          {identifier: 'cookie_policy',version: '1'},
        ],
        proofs: [
          {
            content: '{}',
            form: '<form></form>',
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
      if ('error' in result) {
        console.log(result);
        expect.fail('Response error! ' + result.message);
      }
      else
        expect(true);
    });
  });
  describe('Subjects', function () {
    it('Get Subjects', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey});
      const result = await client.getSubjects();
      if ('error' in result)
        expect.fail('Response error! ' + result.message);
      else
        expect(true);
    });
    it('Get Subject with id', async function () {
      const client = new IubendaConsentSolution({apiKey: validApiKey});
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
    //ToDo implements createSubject(), updateSubject()
  });

});