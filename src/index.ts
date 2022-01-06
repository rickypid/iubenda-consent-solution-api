import {get, post, put, SuperAgentRequest} from 'superagent';

//region consent
export interface ConsentsQueryParameters {
  /**
   * Filter by consents timestamp. Returns all consents from that time onward (inclusive). Valid formats: 2018-02-22 00:40:00 UTC, 2018-02-22T00:40:00Z (ISO 8601), 1519260000 (unix timestamp in seconds).
   */
  from_time?: string;
  /**
   * Filter by consents timestamp. Returns all consents from that time backward (inclusive). Valid formats: 2018-02-22 00:40:00 UTC, 2018-02-22T00:40:00Z (ISO 8601), 1519260000 (unix timestamp in seconds).
   */
  to_time?: string;
  /**
   * Filter by consents source. Possible values: public, private.
   */
  source?: ['public', 'private'];
  /**
   * Filter by IP address. Default null. Valid formats (IP address format).
   */
  ip_address?: string;
  /**
   * Filter by consents type. By not passing this value it returns all consents. Possible values: cookie_policy, null. Default not passed.
   */
  consent_type?: string;
  /**
   * Filter by Subject ID.
   */
  subject_id?: string;
  /**
   * Filter by Subject email. It must exactly match (case sensitive).
   */
  subject_email_exact?: string;
  /**
   * Filter by Subject email. It tries to match parts of the provided email split by dots and spaces. Ex. providing “@test.com” will match all the subjects with an email containing “@test” or containing “com” (case insensitive).
   */
  subject_email?: string;
  /**
   * Filter by Subject first name. It must exactly match (case sensitive).
   */
  subject_first_name?: string;
  /**
   * Filter by Subject last name. It must exactly match (case sensitive).
   */
  subject_last_name?: string;
  /**
   * Filter by Subject full name. It tries to match parts of the provided full name split by dots and spaces. Ex. “test hello” will match all the subjects with a full name containing “test” or containing “hello” (case insensitive).
   */
  subject_full_name?: string;
  /**
   * Filter by subject verified status. Possible values: true, false.
   */
  subject_verified?: boolean;
  /**
   * Filter for consents in which the key exists.
   */
  preference_key?: string;
  /**
   * Filters for results with the value provided being contained in either subject’s id, first_name, last_name, full_name, email.
   */
  fulltext?: string;
  /**
   *    Cursor which indicates after which Consent the results should be returned (cursor excluded).
   */
  starting_after?: string;
  /**
   * Number indicating the number of results returned. Min: 1, Max: 100. Default 10.
   */
  limit?: number;
}

export interface Consent {
  /**
   * auto-filled if not provided, ISO 8601 timestamp at which the consent occurred
   */
  timestamp?: string;
  checksum?: string;
  subject?: ConsentSubject;
  /**
   * Set of key-value pairs with user preferences for the consent action
   */
  preferences?: ConsentPreferences;
  /**
   * Considered only when using a `private` key. Saves the passed IP address on the Consent. Default null
   */
  ip_address?: null;
  /**
   * Default `true`, Considered only when using a `public` key. Enables or disables (true, false) the IP address autedetection. Default true
   */
  autodetect_ip_address: string;
}

export interface ConsentExtended extends Consent {
  legal_notices?: (ConsentLegalNoticesEntity)[] | null;
  proofs?: (ConsentProofsEntity)[] | null;
}

export interface ConsentResponse extends Consent {
  /**
   * Optional, auto-filled if not provided
   */
  id: string;
  owner: string;
  source: string;
}

export interface ConsentPostResponse extends Consent {
  id: string;
  timestamp: string;
  subject_id: string;
}

export interface ConsentSubject {
  /**
   * Optional, auto-filled if not provided
   */
  id?: string;
  owner_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  /**
   * Reserved field used to signal whether a subject is verified, for instance via the double opt-in method
   */
  verified?: boolean;
}

export interface ConsentPreferences {
  [key: string]: string;
}

export interface ConsentLegalNoticesEntity {
  /**
   * privacy_policy, cookie_policy, term or a custom identifier
   */
  identifier: string;
  /**
   * Optional, auto-filled if not provided
   */
  version: string;
}

export interface ConsentProofsEntity {
  content: string;
  form: string;
}

//endregion

//region subject
export interface SubjectQueryParameters {
  /**
   * Filter by id. It must exactly match. Default null
   */
  id: string;
  /**
   * Filter by owner_id. It must exactly match. Default null
   */
  owner_id: string;
  /**
   * Filter by email. It must exactly match (case sensitive). Default null
   */
  email_exact: string;
  /**
   * Filter by email. It tries to match parts of the provided email split by dots and spaces. Ex. providing “@test.com” will match all the subjects with an email containing “@test” or containing “com” (case insensitive). Default null
   */
  email: string;
  /**
   * Filter by first name. It must exactly match (case sensitive). Default null
   */
  first_name: string;
  /**
   * Filter by last name. It must exactly match (case sensitive). Default null
   */
  last_name: string;
  /**
   * Filter by full name. It tries to match parts of the provided full name split by dots and spaces. Ex. “test hello” will match all the subjects with a full name containing “test” or containing “hello” (case insensitive). Default null
   */
  full_name: string;
  /**
   * Filter by subjects timestamp. Returns all subjects from that time onward (inclusive). Valid formats: 2018-02-22 00:40:00 UTC, 2018-02-22T00:40:00Z (ISO 8601), 1519260000 (unix timestamp in seconds). Default null
   */
  from_time: string;
  /**
   * Filter by subjects timestamp. Returns all subjects from that time backward (inclusive). Valid formats: 2018-02-22 00:40:00 UTC, 2018-02-22T00:40:00Z (ISO 8601), 1519260000 (unix timestamp in seconds). Default null
   */
  to_time: string;
  /**
   * Filter by verified status. Possible values: true, false. Default null
   */
  verified: boolean;
  /**
   * Filters for results with the value provided being contained in either id, first_name, last_name, full_name, email. Default null
   */
  fulltext: string;
  /**
   * Cursor which indicates after which Subject the results should be returned (cursor excluded). Default null
   */
  starting_after: string;
  /**
   * Number indicating the number of results returned. Min: 1, Max: 101. Default 10
   */
  limit: number;
}

export interface Subject {
  /**
   * Optional, auto-filled if not provided
   */
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  verified?: boolean;
}

export interface SubjectResponse extends Subject {
  owner_id: string;
  preferences?: SubjectPreferences;
  timestamp: string;
}

export interface SubjectPreferences {
  [key: string]: Preference;
}

export interface Preference {
  value: boolean;
  consent_id: string;
}

export interface SubjectPostResponse {
  id: string;
  timestamp: string;
}

//endregion

export interface ResponseError {
  error: boolean;
  status: number;
  message: string;
}

export interface ClientOption {
  apiKey: string;
  beta?: boolean;
  unescape_json?: boolean;
}

export class IubendaConsentSolution {
  apiKey: string;
  beta: boolean;
  unescape_json: boolean;

  constructor(options: ClientOption) {
    this.apiKey = options.apiKey;
    this.beta = options.beta || false;
    this.unescape_json = options.unescape_json || false;
  }

  get apiUrl(): string {
    let url = 'https://consent.iubenda.com/';
    if (this.beta)
      url += 'beta/';
    return url;
  }

  private addHeaders(request: SuperAgentRequest): SuperAgentRequest {
    return request.set('Content-Type', 'application/json').set('ApiKey', this.apiKey).ok(res => true);
  }

  private generateUrl(path: string): string {
    let url = this.apiUrl + '/' + path;
    if (this.unescape_json)
      url += '?unescape_json=true';
    return url;
  }

  private static async sendRequest(request: SuperAgentRequest): Promise<ResponseError | any> {
    const response = await request;
    if (response.status < 300) {
      return response.body;
    } else {
      return {status: response.status, message: response.body.message, error: true};
    }
  }

  async getConsents(query?: ConsentsQueryParameters): Promise<ResponseError | ConsentResponse[]> {
    const req = this.addHeaders(get(this.generateUrl('consent')));
    if (query) {
      req.query(query);
    }
    return await IubendaConsentSolution.sendRequest(req);
  }

  async getConsent(id: string): Promise<ResponseError | ConsentExtended> {
    return await IubendaConsentSolution.sendRequest(this.addHeaders(get(this.generateUrl('consent/' + id))));
  }

  async createConsent(consent: ConsentExtended): Promise<ResponseError | ConsentPostResponse> {
    return IubendaConsentSolution.sendRequest(await IubendaConsentSolution.sendRequest(this.addHeaders(post(this.generateUrl('consent')).send(consent))));
  }

  async getSubjects(query?: SubjectQueryParameters): Promise<ResponseError | SubjectResponse[]> {
    const req = this.addHeaders(get(this.generateUrl('subjects')));
    if (query) {
      req.query(query);
    }
    return await IubendaConsentSolution.sendRequest(req);
  }

  async getSubject(id: string): Promise<ResponseError | SubjectResponse> {
    const req = this.addHeaders(get(this.generateUrl('subjects/' + id)));
    return await IubendaConsentSolution.sendRequest(req);
  }

  async createSubject(subject: Subject): Promise<ResponseError | SubjectPostResponse> {
    const req = this.addHeaders(post(this.generateUrl('subjects')).send(subject));
    return await IubendaConsentSolution.sendRequest(req);
  }

  async updateSubject(subject: Subject, id: string): Promise<ResponseError | SubjectPostResponse> {
    const req = this.addHeaders(put(this.generateUrl('subjects/' + id)).send(subject));
    return await IubendaConsentSolution.sendRequest(req);
  }
}


