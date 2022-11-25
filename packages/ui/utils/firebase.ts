import { DatabaseReference } from "firebase/database";

export function getPath(ref: DatabaseReference): string {
  return ref.toString().replace(ref.root.toString(), "");
}