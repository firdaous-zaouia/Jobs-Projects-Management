import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addProject, updateProject } from 'src/app/ngrx/project.action';
import { DateValidator } from 'src/app/shard/date.validators';
import { v4 as uuidv4} from 'uuid';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/ngrx/project.model';
import { ProjectState } from 'src/app/ngrx/project.reducer';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent {
  projectForm!: FormGroup;
  editMode = false;
  projectId: string |null = null;

  categories: string[]=[
    'Education',
    'Environement',
    'Art et Culture',
    'Santé',
    'Social et Communautaire',
    'Sport',
    'Humanitaire',
    'Science et Recherche',
    'Transport et Mobilité',
    'Immobilier'
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
  //Récuperer des controleurs du formulaire pour les validations
  get titre(){
    return this.projectForm.get("titre");
  }

  get categorie(){
    return this.projectForm.get("categorie");
  }

  get localisation(){
    return this.projectForm.get("localisation");
  }

  get montantAtteindre(){
    return this.projectForm.get("montantAtteindre");
  }

  get  dateCreation(){
    return this.projectForm.get("dateCreation");
  }

  get  dateLimite(){
    return this.projectForm.get("dateLimite");
  }

  get description(){
    return this.projectForm.get("description");
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<{ projectState: ProjectState }>, 
    private router: Router,
    private route: ActivatedRoute){}

    ngOnInit(){
      this.projectForm = this.fb.group(
        {
        titre: ["",[Validators.required,
                    Validators.minLength(3),
                    Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$"),
                  ]
                 ],
        categorie: ["",[Validators.required,
                         Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$")],
                     ],
        localisation :["",[Validators.required,
                      Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$")],
                  ],
        montantAtteindre :["",[Validators.required,
                              Validators.min(0)]
                         ],
        dateCreation :["",Validators.required],
        dateLimite :["",Validators.required],
        description :["",Validators.required]
      },{ validators: DateValidator('dateCreation','dateLimite')}
    );
    

//Récupérer l'ID du projet depuis les paramétre de la route
    this.route.paramMap.subscribe(params =>{
      this.projectId = params.get('id');
      if (this.projectId){
        this.editMode = true;
        this.loadProjectData();
      }
    });
    }


    loadProjectData(){
      //Chargement du projet depuis le store
      this.store.select(state => state.projectState.projects).subscribe(projects =>{
        const project = projects.find(p => p.id === this.projectId);
        if (project){
          this.projectForm.patchValue(project);//Pré remplir le formulaire avec les données
        }
      }) 
    }

  onSubmit(){
    if(this.projectForm.valid){
      const project = { ...this.projectForm.value};
      if (this.editMode && this.projectId){
        this.store.dispatch(updateProject({ id: this.projectId, project }));
      } else{
        this.store.dispatch(addProject({ project: {...project, id: uuidv4()}}));
      }
      this.router.navigate(['/projects']);
    }
    else{
      console.log("Formulaire invalide");
      
    }
  }
  resetForm() {
    this.editMode = false;
    this.projectId = null;
    this.projectForm.reset();
  }
}
