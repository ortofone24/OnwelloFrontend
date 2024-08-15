import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createPerson } from '../common/interface';
import { ApiService } from '../common/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcandidates',
  templateUrl: './addcandidates.component.html',
  styleUrl: './addcandidates.component.css'
})
export class AddcandidatesComponent {

  addCandidate!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private toastr: ToastrService) {
    this.addCandidate = this.formBuilder.group(
      {
        candidate: ['', [Validators.required]]
      }
    )
  }

  storeCandidate() {
    if (this.addCandidate.valid) {

      this.submitted = true;

      const candidateValue = this.addCandidate.get('candidate')?.value;
      console.log(candidateValue);

      let data: createPerson = {
        name: candidateValue
      }

      this.apiService.createCandidate(data).subscribe(data => {
        console.log(data);
      })

      this.toastr.success('Candidate added successfully!', 'Success');
      this.addCandidate.reset();
    } else {
      this.toastr.error('Please enter a valid candidate name.', 'Error');
    }
  }

  isNextEnabled(): boolean {
    return this.submitted;
  }
}
