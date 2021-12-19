import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../constants/firebase-config";
import { auth } from "../constants/firebase-config";

//Fetch data from the collection
//While fetching, data is saved into the state as docs to be able to reach its id alognside the data
//doc.data() method can be used to get the data stored inside
//doc.id  brings the id of the document
export const getAllCourses = async () => {
  const dataArray = [];
  const querySnapshot = await getDocs(collection(db, "courses"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    dataArray.push({ data: doc.data(), id: doc.id });
  });
  console.log(dataArray);
  return dataArray;
};

export const getCourseData = async (coursename) => {
  let q = query(
    collection(db, "courses"),
    where("course_name", "==", coursename)
  );
  let querySnapshot = await getDocs(q);
  let course_data;
  querySnapshot.forEach((element) => {
    course_data = element.data();
  });
  return course_data;
};

export const getCourseRef = async (coursename) => {
  let q = query(
    collection(db, "courses"),
    where("course_name", "==", coursename)
  );
  let querySnapshot = await getDocs(q);
  let courseRef;
  querySnapshot.forEach((element) => {
    courseRef = element;
  });
  return courseRef;
};

//To be able to reach the document, id is required.
//Then update the parent course's lectures
export const updateCourseLectures = async (
  lectureName,
  newLectures,
  relatedCourseID
) => {
  const coursesCollectionRef = doc(db, "courses", relatedCourseID);
  try {
    await updateDoc(coursesCollectionRef, { lectures: newLectures });
    alert("Lecture list updated");
  } catch (err) {
    console.log(err);
  }
};
