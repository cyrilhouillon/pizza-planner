export type Pizza = {
  readonly name: string;
  readonly taille: 'M' | 'G';
  readonly notes?: string;
};

export type Commande = {
  readonly creneau: string;
  readonly pizzas: ReadonlyArray<Pizza>;
};

export type Planner = {
  /**
   * Indique le nombre maximum de pizzas commandables pour un créneau horaire donné
   * @param creneau un créneau horaire au format HH:mm
   * @returns le nombre de pizzas qu'on peut ajouter à ce créneau
   */
  readonly placesLibresPour: (creneau: string) => number;

  /**
   * Récupère le contenu du prochain créneau
   * @returns la liste des pizzas du prochain créneau
   */
  readonly prochainCreneau: () => ReadonlyArray<Pizza>;

  /**
   * Valide l'impression d'un créneau, ce qui implique que les pizzas du créneau précédent ont été faites.
   * @param creneau un créneau horaire au format HH:mm
   * @returns true si la validation a été effectuée
   */
  readonly validerImpression: (creneau: string) => boolean;

  /**
   * Enregistre une commande pour le créneau horaire donné
   * @param creneau un créneau horaire au format HH:mm
   * @param pizzas la liste des pizzas de la commande
   * @returns true si la commande est validée
   */
  readonly commander: (commande: Commande) => boolean;
};
