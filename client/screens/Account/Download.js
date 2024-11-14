import React from 'react';
import { View, Button, Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const DownloadDataButton = () => {
  const downloadPDF = async () => {
    try {
      const options = {
        html: `<h1>Hello, PDF!</h1>`,
        fileName: 'simple_pdf',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('PDF Created', `File Path: ${file.filePath}`);
    } catch (error) {
      console.error('Error generating PDF: ', error);
      Alert.alert('Error', 'There was an issue generating the PDF');
    }
  };

  return (
    <View>
      <Button title="Download PDF" onPress={downloadPDF} />
    </View>
  );
};

export default DownloadDataButton;
