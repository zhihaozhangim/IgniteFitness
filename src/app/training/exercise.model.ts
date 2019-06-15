/** Defines the field an Exercise object should have */
export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  /** date? means the date field is optional.
   *  Because if we populate an exercise in the dropdown menu,
   *  data field is not needed.
   */
  date?: Date;
  /** state? means the date field is optional.
   *  Because if we populate an exercise in the dropdown menu,
   *  data field is not needed.
   */
  state?: 'completed' | 'cancelled' | null;
}
