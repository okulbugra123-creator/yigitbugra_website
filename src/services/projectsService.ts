import { 
  collection, doc, getDocs, setDoc, writeBatch, onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase';
import { WeeklyApp } from '../types';
import { INITIAL_WEEKLY_APPS } from '../data/appsData';

const COLLECTION_NAME = 'weekly_projects';

// Format Firestore document data
function cleanProjectData(app: WeeklyApp) {
  return {
    id: app.id,
    weekNumber: app.weekNumber,
    weekLabel: app.weekLabel,
    title: app.customTitle || app.title,
    description: app.customDescription || app.description,
    projectUrl: app.projectUrl || '',
    githubUrl: app.githubUrl || '',
    category: app.category || 'Geliştirici & Kod',
    status: app.status || (app.projectUrl ? 'Yayında' : 'Boş (Proje Bekleniyor)')
  };
}

// Fetch all 30 weekly projects from Firestore
export async function fetchProjectsFromFirestore(): Promise<WeeklyApp[] | null> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const cloudMap = new Map<number, any>();
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data && typeof data.id === 'number') {
          cloudMap.set(data.id, data);
        }
      });

      // Merge cloud data with initial curriculum data
      const merged: WeeklyApp[] = INITIAL_WEEKLY_APPS.map(baseApp => {
        const cloudData = cloudMap.get(baseApp.id);
        if (cloudData) {
          return {
            ...baseApp,
            title: cloudData.title || baseApp.title,
            customTitle: cloudData.title || baseApp.title,
            description: cloudData.description || baseApp.description,
            customDescription: cloudData.description || baseApp.description,
            projectUrl: cloudData.projectUrl || '',
            githubUrl: cloudData.githubUrl || '',
            category: cloudData.category || baseApp.category,
            status: cloudData.status || (cloudData.projectUrl ? 'Yayında' : 'Boş (Proje Bekleniyor)')
          };
        }
        return baseApp;
      });

      return merged;
    }
  } catch (error) {
    console.warn('Firestore fetchProjects error:', error);
  }
  return null;
}

// Save a single project to Firestore
export async function saveProjectToFirestore(app: WeeklyApp): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, `week-${app.id}`);
    await setDoc(docRef, cleanProjectData(app), { merge: true });
    return true;
  } catch (error) {
    console.error('Firestore saveProject error:', error);
    return false;
  }
}

// Save all 30 projects to Firestore in batch
export async function saveAllProjectsToFirestore(apps: WeeklyApp[]): Promise<boolean> {
  try {
    const batch = writeBatch(db);
    apps.forEach(app => {
      const docRef = doc(db, COLLECTION_NAME, `week-${app.id}`);
      batch.set(docRef, cleanProjectData(app), { merge: true });
    });
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Firestore batch save error:', error);
    return false;
  }
}

// Subscribe to real-time changes across all devices
export function subscribeToFirestoreProjects(onData: (apps: WeeklyApp[]) => void): () => void {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      if (!snapshot.empty) {
        const cloudMap = new Map<number, any>();
        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (data && typeof data.id === 'number') {
            cloudMap.set(data.id, data);
          }
        });

        const merged: WeeklyApp[] = INITIAL_WEEKLY_APPS.map(baseApp => {
          const cloudData = cloudMap.get(baseApp.id);
          if (cloudData) {
            return {
              ...baseApp,
              title: cloudData.title || baseApp.title,
              customTitle: cloudData.title || baseApp.title,
              description: cloudData.description || baseApp.description,
              customDescription: cloudData.description || baseApp.description,
              projectUrl: cloudData.projectUrl || '',
              githubUrl: cloudData.githubUrl || '',
              category: cloudData.category || baseApp.category,
              status: cloudData.status || (cloudData.projectUrl ? 'Yayında' : 'Boş (Proje Bekleniyor)')
            };
          }
          return baseApp;
        });

        onData(merged);
      }
    }, (error) => {
      console.warn('Firestore onSnapshot listener error:', error);
    });

    return unsubscribe;
  } catch (err) {
    console.warn('Firestore subscription failed:', err);
    return () => {};
  }
}
