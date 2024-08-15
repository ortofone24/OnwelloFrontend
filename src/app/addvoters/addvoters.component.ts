import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createPerson } from '../common/interface';
import { ApiService } from '../common/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addvoters',
  templateUrl: './addvoters.component.html',
  styleUrl: './addvoters.component.css'
})
export class AddvotersComponent {

  addVoter!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private toastr: ToastrService) {
    this.addVoter = this.formBuilder.group(
      {
        voter: ['', [Validators.required]]
      })
  }

  storeVoter() {
    if (this.addVoter.valid) {

      this.submitted = true;

      const voterValue = this.addVoter.get('voter')?.value;

      let data: createPerson = {
        name: voterValue
      }

      this.apiService.createVoter(data).subscribe(data => {
        console.log(data);
      })

      this.toastr.success('Voter added successfully!', 'Success');
      this.addVoter.reset();
    } else {
      this.toastr.error('Please enter a valid voter name.', 'Error');
    }

  }

  isNextEnabled(): boolean {
    return this.submitted;
  }

}
