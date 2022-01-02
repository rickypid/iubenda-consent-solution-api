import {get, post, put, SuperAgentRequest} from 'superagent';
import {ConsentExtended, ConsentPostResponse, ConsentResponse, ConsentsQueryParameters} from '~/consent';
import {Subject, SubjectPostResponse, SubjectQueryParameters, SubjectResponse} from '~/subject';

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

  private async sendRequest(request: SuperAgentRequest): Promise<ResponseError | any> {
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
    return await this.sendRequest(req);
  }

  async getConsent(id: string): Promise<ResponseError | ConsentExtended> {
    return await this.sendRequest(this.addHeaders(get(this.generateUrl('consent/' + id))));
  }

  async createConsent(consent: ConsentExtended): Promise<ResponseError | ConsentPostResponse> {
    return this.sendRequest(await this.sendRequest(this.addHeaders(post(this.generateUrl('consent')).send(consent))));
  }

  async getSubjects(query?: SubjectQueryParameters): Promise<ResponseError | SubjectResponse[]> {
    const req = this.addHeaders(get(this.generateUrl('subjects')));
    if (query) {
      req.query(query);
    }
    return await this.sendRequest(req);
  }

  async getSubject(id: string): Promise<ResponseError | SubjectResponse> {
    const req = this.addHeaders(get(this.generateUrl('subjects/' + id)));
    return await this.sendRequest(req);
  }

  async createSubject(subject: Subject): Promise<ResponseError | SubjectPostResponse> {
    const req = this.addHeaders(post(this.generateUrl('subjects')).send(subject));
    return await this.sendRequest(req);
  }

  async updateSubject(subject: Subject, id: string): Promise<ResponseError | SubjectPostResponse> {
    const req = this.addHeaders(put(this.generateUrl('subjects/' + id)).send(subject));
    return await this.sendRequest(req);
  }
}


