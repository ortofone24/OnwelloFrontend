import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createPerson, VoterPerson, CandidatePerson } from '../common/interface'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = "https://localhost:7206";
  constructor(private httpClient: HttpClient) { }

  createCandidate(data: createPerson): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/Candidate', data);
  }

  createVoter(data: createPerson): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/Voters', data);
  }

  getAllVoters(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/Voters')
  }

  getAllCandidates(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/Candidate')
  }

  getVoters(): Observable<VoterPerson[]> {
    return this.httpClient.get<any[]>(this.baseUrl + '/Voters').pipe(
      map(response => {
        return response.map(item => ({
          id: item.id,
          name: item.name,
          voted: false
        }))
      }))
  }

  getCandidates(): Observable<CandidatePerson[]> {
    return this.httpClient.get<any[]>(this.baseUrl + '/Candidate').pipe(
      map(response => {
        return response.map(item => ({
          id: item.id,
          name: item.name,
          votes: 0
        }))
      })
    )
  }

}
