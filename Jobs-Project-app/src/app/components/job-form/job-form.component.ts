import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from './shard/date.validators';
import { JobService } from '../service/job.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup; 
  isEditing: boolean = false; // Variable pour savoir si on est en mode édition
  currentIndex: number | null = null; // Stocke l'index du job à éditer

  // Récupération des contrôles du formulaire pour les validations
  get titre() {
    return this.jobForm.get('titre');
  }

  get localisation() {
    return this.jobForm.get('localisation');
  }

  get categorie() {
    return this.jobForm.get('categorie');
  }

  get description() {
    return this.jobForm.get('description');
  }

  get dateDebut() {
    return this.jobForm.get('dateDebut');
  }

  get salaire() {
    return this.jobForm.get('salaire');
  }

  constructor(private fb: FormBuilder, private jobService: JobService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Initialisation du formulaire avec des validations
    this.jobForm = this.fb.group(
      { 
        index: [null], // Ajoute le champ index ici
        titre: ['', [Validators.required, Validators.minLength(3)]], // Correspond à 'title' dans le template
        localisation: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s-]+$')]], 
        categorie: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s-]+$')]], // Correspond à 'category' dans le template
        description: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: [''],
        salaire: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]]
      },
      { validators: DateValidator }
    );

    // Vérifier si un emploi est en cours d'édition via l'URL
    this.route.paramMap.subscribe(params => {
      const jobIndex = params.get('id');
      if (jobIndex !== null) {
        this.isEditing = true;
        this.currentIndex = +jobIndex; // Convertir en nombre
        const jobToEdit = this.jobService.getJobsValue()[this.currentIndex]; // Récupérer l'emploi à éditer
        if (jobToEdit) {
          this.jobForm.patchValue(jobToEdit); // Pré-remplir le formulaire avec les données existantes
        }
      }
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      if (this.isEditing && this.currentIndex !== null) {
        // Mode édition : Mettre à jour l'emploi
        this.jobService.updateJob(this.currentIndex, this.jobForm.value);
      } else {
        // Mode création : Ajouter un nouvel emploi
        this.jobService.addJob(this.jobForm.value);
      }

      // Rediriger vers la liste des emplois
      this.router.navigate(['/jobs']);
    } else {
      console.log('Formulaire invalide');
    }
  }

  // Reinitialiser le formulaire et quitter le mode édition
  resetForm() {
    this.isEditing = false;
    this.currentIndex = null;
    this.jobForm.reset();
  }
}
