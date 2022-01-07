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
