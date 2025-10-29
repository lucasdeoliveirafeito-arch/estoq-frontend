import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../services/api"; // ✅ já configurado com baseURL

export default function CatalogoProdutos() {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    codigo: "",
    categoria: "",
    unidade: "",
    preco_custo: "",
  });

  // 🔄 Buscar produtos do backend
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Adicionar produto
  const adicionarProduto = async () => {
    if (!novoProduto.nome || !novoProduto.categoria || !novoProduto.unidade) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await api.post("/produtos", {
        nome: novoProduto.nome,
        categoria: novoProduto.categoria,
        unidade: novoProduto.unidade,
        preco_custo: parseFloat(novoProduto.preco_custo) || 0,
        ativo: true,
      });

      setModalVisible(false);
      setNovoProduto({
        nome: "",
        codigo: "",
        categoria: "",
        unidade: "",
        preco_custo: "",
      });
      carregarProdutos();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      Alert.alert("Erro", "Falha ao adicionar produto.");
    }
  };

  const renderProduto = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            item.imagem ||
            "https://cdn-icons-png.flaticon.com/512/706/706164.png",
        }}
        style={styles.imagem}
      />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.codigo}>SKU: {item.codigo || "—"}</Text>
      <Text style={styles.categoria}>{item.categoria}</Text>
      <Text style={styles.preco}>
        R$ {item.preco_custo ? item.preco_custo.toFixed(2) : "0.00"}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Catálogo de Produtos</Text>

      <TextInput
        placeholder="Buscar produtos..."
        style={styles.input}
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={produtosFiltrados}
        renderItem={renderProduto}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        nestedScrollEnabled
      />

      {/* ➕ Modal para novo produto */}
      <TouchableOpacity
        style={styles.botaoFlutuante}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons name="plus" size={26} color="#fff" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>Novo Produto</Text>

            <TextInput
              placeholder="Nome"
              style={styles.modalInput}
              value={novoProduto.nome}
              onChangeText={(t) => setNovoProduto({ ...novoProduto, nome: t })}
            />
            <TextInput
              placeholder="Categoria"
              style={styles.modalInput}
              value={novoProduto.categoria}
              onChangeText={(t) =>
                setNovoProduto({ ...novoProduto, categoria: t })
              }
            />
            <TextInput
              placeholder="Unidade (kg, L, un...)"
              style={styles.modalInput}
              value={novoProduto.unidade}
              onChangeText={(t) =>
                setNovoProduto({ ...novoProduto, unidade: t })
              }
            />
            <TextInput
              placeholder="Preço de custo"
              style={styles.modalInput}
              keyboardType="numeric"
              value={novoProduto.preco_custo}
              onChangeText={(t) =>
                setNovoProduto({ ...novoProduto, preco_custo: t })
              }
            />

            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={[styles.modalBotao, { backgroundColor: "#4F46E5" }]}
                onPress={adicionarProduto}
              >
                <Text style={styles.modalBotaoTexto}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBotao, { backgroundColor: "#9CA3AF" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBotaoTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  imagem: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  nome: { fontSize: 16, fontWeight: "700", color: "#111827" },
  codigo: { color: "#6B7280", marginBottom: 4 },
  categoria: { color: "#4F46E5", fontWeight: "600", marginBottom: 4 },
  preco: { color: "#111827", fontWeight: "600" },
  botaoFlutuante: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#4F46E5",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalConteudo: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBotao: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  modalBotaoTexto: {
    color: "#fff",
    fontWeight: "600",
  },
});
