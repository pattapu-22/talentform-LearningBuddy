import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export const logActivity = async (user, activity) => {
  if (!user) return
  try {
    await addDoc(collection(db, 'users', user.uid, 'activity'), {
      ...activity,
      timestamp: serverTimestamp()
    })
  } catch (error) {
    console.error('Error logging activity:', error)
  }
}
