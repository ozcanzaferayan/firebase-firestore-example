import { StatusBar } from "expo-status-bar";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { db } from "./src/services/firebase";

export default function App() {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  // Status: idle, loading, error
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    // Status loading ise bir şey yapma
    if (status === "loading") {
      return;
    }
    const usersCollection = collection(db, "users");
    const queryy = query(usersCollection, orderBy("name", "desc"));

    getDocs(queryy).then((snapshot) => {
      const users = snapshot.docs.map((doc) => {
        const id = doc.id;
        const user = doc.data();
        return {
          id: id,
          name: user.name,
        };
      });
      // Setting state
      setUsers(users);
    });
  }, [status]);

  const handleSave = () => {
    setStatus("loading");
    const usersCollection = collection(db, "users");
    addDoc(usersCollection, { name: user }).finally(() => {
      setStatus("idle");
    });
  };

  const handleDelete = (id) => {
    setStatus("deleting");
    const userDoc = doc(db, "users", id);
    deleteDoc(userDoc)
      .then(() => {
        console.log("Deleted");
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <TextInput
          onChangeText={setUser}
          value={user}
          style={styles.textInput}
          placeholder="Enter your name"
          autoComplete="off"
        />
        <Button
          title={status === "loading" ? "Kaydediliyor" : "Kaydet"}
          onPress={handleSave}
        />
        {users.map((user) => (
          <View style={{ flexDirection: "row" }} key={user.id}>
            <Text key={user.id}>{user.name}</Text>
            <Button
              title={status === "deleting" ? "Siliniyor" : "Sil"}
              onPress={() => handleDelete(user.id)}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {},
  container: {
    padding: 16,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
});
