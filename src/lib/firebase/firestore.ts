import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "./config";

// ─── Generic fetch all ────────────────────────────────────────────────────────
export async function fetchCollection<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const ref = collection(db, collectionName);
  const q = constraints.length ? query(ref, ...constraints) : query(ref);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

// ─── Generic fetch single doc ─────────────────────────────────────────────────
export async function fetchDoc<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  const ref = doc(db, collectionName, docId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as T;
}

// ─── Generic fetch by field ───────────────────────────────────────────────────
export async function fetchByField<T>(
  collectionName: string,
  field: string,
  value: unknown
): Promise<T | null> {
  const ref = collection(db, collectionName);
  const q = query(ref, where(field, "==", value), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as T;
}

// ─── Generic add ──────────────────────────────────────────────────────────────
export async function addDocument<T extends object>(
  collectionName: string,
  data: T
): Promise<string> {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// ─── Generic update ───────────────────────────────────────────────────────────
export async function setDocument<T extends object>(
  collectionName: string,
  docId: string,
  data: T,
  merge = true
): Promise<void> {
  await setDoc(
    doc(db, collectionName, docId),
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge }
  );
}

export async function updateDocument<T extends object>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> {
  await updateDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ─── Generic delete ───────────────────────────────────────────────────────────
export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  await deleteDoc(doc(db, collectionName, docId));
}

// ─── Re-export query helpers so services don't import firebase directly ───────
export { orderBy, where, limit };
