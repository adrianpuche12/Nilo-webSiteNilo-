import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  description: string;
}

interface BlogPostDetailsProps {
  selectedPost: Post | null;
  onClose?: () => void;
}

const BlogPostDetails = ({ selectedPost, onClose }: BlogPostDetailsProps) => {
  if (!selectedPost) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPostText}>No hay post seleccionado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>{selectedPost.title}</Text>
        <Text style={styles.date}>Publicado el {selectedPost.date}</Text>
        <Text style={styles.description}>{selectedPost.description}</Text>
        <Text style={styles.content}>{selectedPost.content}</Text>
      </ScrollView>
      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default BlogPostDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    lineHeight: 22,
  },
  content: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  noPostText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})