export interface Job {
    id: string;
    responsable: string;
    titre: string;
    localisation: string;
    categorie: string;
    description: string;
    dateDebut: string;
    dateFin?: string;
    salaire?: number;
  }