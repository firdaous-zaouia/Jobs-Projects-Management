import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { DateValidator } from "src/app/shard/date.validators";
import { Job } from "src/app/ngrx/job.model";
import { Store } from "@ngrx/store";
import { addJob, updateJob} from "src/app/ngrx/job.actions";
import { Observable } from "rxjs";
import { selectJobByIndex } from "src/app/ngrx/job.selectors";
import { JobState } from "src/app/ngrx/job.reducer";

@Component({
  selector: "app-job-form",
  templateUrl: "./job-form.component.html",
  // styleUrls: ['./job-form.component.css'],
  providers:[CurrencyPipe]
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup;
  isEditing: boolean = false; // Variable pour savoir si on est en mode édition
  currentIndex: number = -1; // Stocke l'index du job à éditer
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
    private store: Store<{jobs: JobState}>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // Initialisation du formulaire avec des validations
    this.jobForm = this.fb.group(
      {
        responsable: ["",[Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$")]],
        index: [null], // Ajoute le champ index ici
        titre: ["", [Validators.required, Validators.minLength(3)]], // Correspond à 'title' dans le template
        localisation: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$")],
        ],
        categorie: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$")],
        ], // Correspond à 'category' dans le template
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
      { validators: DateValidator }
    );

    // Vérifier si un emploi est en cours d'édition via l'URL
    this.route.paramMap.subscribe((params) => {
      const jobIndex = params.get("id");
      if (jobIndex !== null) {
        this.isEditing = true;
        this.currentIndex = +jobIndex;
  
        // Utiliser le sélecteur pour récupérer l'emploi
        this.job$ = this.store.select(selectJobByIndex(this.currentIndex)); // Utiliser le sélecteur
        this.job$.subscribe((jobToEdit: Job | undefined) => {
          if (jobToEdit) {
            this.jobForm.patchValue(jobToEdit); // Pré-remplir le formulaire avec les données récupérées
          }
        });
      }
    });
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
      const jobData: Job = this.jobForm.value;
      if (this.isEditing && this.currentIndex !== null) {
        // Dispatch de l'action NGRX pour mettre à jour l'emploi
        this.store.dispatch(updateJob({ index: this.currentIndex, job: jobData }));
      } else {
        // Dispatch de l'action NGRX pour ajouter un nouvel emploi
        this.store.dispatch(addJob({ job: jobData }));
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
    this.currentIndex = -1;
    this.jobForm.reset();
  }
}
