import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from './shard/date.validators';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup; 

  get titre(){
    return this.jobForm.get('titre');
  }

  get localisation(){
    return this.jobForm.get('localisation');
  }

  get category(){
    return this.jobForm.get('categorie');
  }

  get description(){
    return this.jobForm.get('description');
  }

  get dateDebut(){
    return this.jobForm.get('categorie');
  }

  get salaire(){
    return this.jobForm.get('categorie');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialise le formulaire avec des validations
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      localisation: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s-]+$')]], // "localisation" ici
      category: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s-]+$')]],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: [''],
      salaire: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]]
    },
  {validators: DateValidator});
  }

  onSubmit() {
    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }
  }

