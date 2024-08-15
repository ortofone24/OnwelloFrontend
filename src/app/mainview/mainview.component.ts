import { Component, OnInit } from '@angular/core';
import { ApiService } from '../common/api.service';
import { VoterPerson, CandidatePerson } from '../common/interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrl: './mainview.component.css'
})
export class MainviewComponent implements OnInit {

  voters: VoterPerson[] = [];
  candidates: CandidatePerson[] = [];
  selectedVoter: VoterPerson | null = null;
  selectedCandidate: CandidatePerson | null = null;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }


  ngOnInit(): void {

    this.apiService.getVoters().subscribe(data => {
      this.voters = data;
      console.log(this.voters)
    })

    this.apiService.getCandidates().subscribe(data => {
      this.candidates = data;
      console.log(this.candidates);
    })
  }

  onVote(): void {
    if (this.selectedVoter && this.selectedCandidate) {

      this.selectedVoter.voted = true;

      this.selectedCandidate.votes += 1;

      this.voters = this.voters.filter(voter => voter.id !== this.selectedVoter!.id);

      this.selectedVoter = null;
      this.selectedCandidate = null;

      this.toastr.success('Vote Added!', 'Success');
    } else {
      this.toastr.error('Something went wrong.', 'Error');
    }
  }
}
