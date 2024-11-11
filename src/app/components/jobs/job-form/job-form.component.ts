import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { DateValidator } from "src/app/shard/date.validators";
import { Job } from "src/app/ngrx/job.model";
import { Store } from "@ngrx/store";
import { addJob, updateJob} from "src/app/ngrx/job.actions";
import { Observable } from "rxjs";
import { v4 as uuidv4} from 'uuid';

import { JobState } from "src/app/ngrx/job.reducer";
import { AppState } from "src/app/shard/app.state";

@Component({
  selector: "app-job-form",
  templateUrl: "./job-form.component.html",
  providers:[CurrencyPipe]
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup;
  isEditing: boolean = false; // Variable pour savoir si on est en mode édition
  JobId: string | null = null; // Stocke l'index du job à éditer
  job$!: Observable<Job | undefined>;
  categories: string[] = [
    'Marketing',
    'Développeur logiciel',
    'Gestion d entreprise',
    'Ventes',
    'Ressources humaines',
    'Finance',
    'Ingénierie',
    'Support client',
    'Conseil',
    'Support informatique',
    'Gestion de projet'
  ];

  localisations: string[]=[
    'Luxembourg',
    'Steinsel',
    'Esch-sur-Alzette',
    'Differdange',
    'Dudelange',
    'Ettelbruck',
    'Diekirch',
    'Wiltz',
    'Remich',
    'Strassen'
  ]
  // Récupération des contrôles du formulaire pour les validations
  get responsable(){
    return this.jobForm.get("responsable");
  }
  get titre() {
    return this.jobForm.get("titre");
  }

  get localisation() {
    return this.jobForm.get("localisation");
  }

  get categorie() {
    return this.jobForm.get("categorie");
  }

  get description() {
    return this.jobForm.get("description");
  }

  get dateDebut() {
    return this.jobForm.get("dateDebut");
  }

  get dateFin(){
    return this.jobForm.get("dateFin");
  }

  get salaire() {
    return this.jobForm.get("salaire");
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // Initialisation du formulaire avec des validations
    this.jobForm = this.fb.group(
      {
        responsable: ["",[Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$")]],
        index: [null], 
        titre: ["", [Validators.required, Validators.minLength(3)]], 
        localisation: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$")],
        ],
        categorie: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$")],
        ], 
        description: ["", Validators.required],
        dateDebut: ["", Validators.required],
        dateFin: [""],
        salaire: [
          "",
          [
            Validators.required,
            Validators.min(0),
            Validators.pattern("^[0-9]+ ?€?$"),
          ],
        ],
      },
      { validators: DateValidator('dateDebut','dateFin') }
    );

    // Vérifier si un emploi est en cours d'édition via l'URL
    this.route.paramMap.subscribe(params => {
      this.JobId = params.get("id");
      if (this.JobId) {
        this.isEditing = true;
        this.loadProjectData();
      }});
    }
  
    loadProjectData(){
      this.store.select(state => state.jobState.jobs).subscribe
      (jobs =>{
        const job = jobs.find(p =>
          p.id === this.JobId);
          if(job){
            this.jobForm.patchValue(job);
          }
      })
    }
  

  //Afficher le symbole monétaire
  onSalaryBlur(){
    let salaryControl = this.jobForm.get('salaire');
    if(salaryControl){
      let salaryValue=salaryControl.value;

      //supprimer le precedent pour eviter les doublons
      salaryValue=salaryValue.replace(/[^0-9]/g,'');
      
      if(salaryValue){
      //Ajouter le format de monnaie
      const formattedSalary=`${salaryValue} €`;
      salaryControl.setValue(formattedSalary,{emitEvent:false});
    }
    }
  }


  onSubmit() {
    if (this.jobForm.valid) {
      const job = {...this.jobForm.value};
      if (this.isEditing && this.JobId) {
        // Dispatch de l'action NGRX pour mettre à jour l'emploi
        this.store.dispatch(updateJob({ id: this.JobId, job }));
      } else {
        // Dispatch de l'action NGRX pour ajouter un nouvel emploi
        this.store.dispatch(addJob({ job: {...job, id: uuidv4()}}));
      }
      // Rediriger vers la liste des emplois
      this.router.navigate(['/jobs']);
    } else {
      console.log("Formulaire invalide");
    }
  }

  // Reinitialiser le formulaire et quitter le mode édition
  resetForm() {
    this.isEditing = false;
    this.JobId = null;
    this.jobForm.reset();
  }
}
