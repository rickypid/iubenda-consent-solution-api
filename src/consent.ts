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
  subject?: Subject;
  /**
   * Set of key-value pairs with user preferences for the consent action
   */
  preferences?: Preferences;
  /**
   * Considered only when using a `private` key. Saves the passed IP address on the Consent. Default null
   */
  ip_address?: null;
  /**
   * Default `true`, Considered only when using a `public` key. Enables or disables (true, false) the IP address autedetection. Default true
   */
  autodetect_ip_address: string;
}
export interface ConsentExtended extends Consent{
  legal_notices?: (LegalNoticesEntity)[] | null;
  proofs?: (ProofsEntity)[] | null;
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

export interface Subject {
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

export interface Preferences {
  [key: string]: string;
}

export interface LegalNoticesEntity {
  /**
   * privacy_policy, cookie_policy, term or a custom identifier
   */
  identifier: string;
  /**
   * Optional, auto-filled if not provided
   */
  version: string;
}

export interface ProofsEntity {
  content: string;
  form: string;
}