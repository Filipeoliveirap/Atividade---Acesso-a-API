import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
} from "react-native";

import { useRepos } from "../hook/useRepos";
import { RepoData } from "../types/RepoData";

export default function RepoListScreen() {
  const { repos, clearAll, addRepo } = useRepos();

  const [modalVisible, setModalVisible] = useState(false);
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  async function handleAdd() {
    try {
      await addRepo(owner, repo);
      setModalVisible(false);
      setOwner("");
      setRepo("");
    } catch {
      alert("Repositório não encontrado");
    }
  }

  return (
    <View style={styles.container}>
      {/* Header Buttons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.headerBtn}> + </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearAll}>
          <Text style={[styles.headerBtn, { color: "red" }]}> - </Text>
        </TouchableOpacity>
      </View>

      <FlatList<RepoData>
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.owner.avatar_url }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.repoName}>{item.name}</Text>
              <Text>Dono: {item.owner.login}</Text>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Adicionar Repositório</Text>

            <TextInput
              placeholder="Owner"
              style={styles.input}
              value={owner}
              onChangeText={setOwner}
            />

            <TextInput
              placeholder="Repo"
              style={styles.input}
              value={repo}
              onChangeText={setRepo}
            />

            <TouchableOpacity style={styles.btn} onPress={handleAdd}>
              <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#888" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: "row", justifyContent: "flex-end" },
  headerBtn: { fontSize: 26, marginHorizontal: 12, fontWeight: "bold" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 10,
  },

  repoName: { fontSize: 18, fontWeight: "bold" },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
});
