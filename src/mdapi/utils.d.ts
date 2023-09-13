type RelationshipType =
  | 'author'
  | 'artist'
  | 'cover_art'
  | 'user'
  | 'scanlation_group'
  | 'manga'
/**
 * A utility type for getting the needed types for a relationship
 * @example ```ts
 * GetRelationship<typeof manga.relationships, 'artist'>
 * ```
 */
type GetRelationship<
  TRelationshipArray extends {
    type: RelationshipType
  }[],
  TRelationshipType extends RelationshipType
> = Extract<
  TRelationshipArray[number],
  {
    type: TRelationshipType
  }
>
type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key]
}
type InferContra<T> = [T] extends [(arg: infer I) => void] ? I : never
type Contra<T> = T extends any ? (arg: T) => void : never
type PickOne<T> = InferContra<InferContra<Contra<Contra<T>>>>
type Union2Tuple<T> = PickOne<T> extends infer U
  ? Exclude<T, U> extends never
    ? [T]
    : [...Union2Tuple<Exclude<T, U>>, U]
  : never

export { GetRelationship, Mutable, RelationshipType, Union2Tuple }
