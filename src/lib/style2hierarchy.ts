// Style2Hierarchy: Document Structure Extraction Engine
// Novel approach using self-tuning clustering for heading detection

export interface FontInfo {
  size: number;
  weight: string;
  style: string;
  family: string;
}

export interface TextBlock {
  text: string;
  font: FontInfo;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  page: number;
}

export interface HeadingCandidate {
  text: string;
  level: string;
  confidence: number;
  reason: string;
  page: number;
  position: {
    x: number;
    y: number;
  };
  fontCluster: number;
  patternMatch?: string;
}

export interface ClusterInfo {
  id: number;
  avgFontSize: number;
  fontWeight: string;
  sampleCount: number;
  headingLevel: string;
  confidence: number;
}

// K-Means clustering implementation for font styles
class FontClusterer {
  private clusters: ClusterInfo[] = [];
  
  // Simple K-means clustering for font sizes and styles
  cluster(textBlocks: TextBlock[], k: number = 4): ClusterInfo[] {
    // Extract font features for clustering
    const features = textBlocks.map(block => ({
      size: block.font.size,
      weight: block.font.weight === 'bold' ? 1 : 0,
      block: block
    }));

    // Initialize clusters with k-means++
    const clusters = this.initializeClusters(features, k);
    
    // Iterate until convergence
    for (let iter = 0; iter < 100; iter++) {
      const assignments = this.assignToClusters(features, clusters);
      const newClusters = this.updateClusters(features, assignments, k);
      
      // Check for convergence
      if (this.clustersConverged(clusters, newClusters)) {
        break;
      }
      clusters.splice(0, clusters.length, ...newClusters);
    }

    // Assign heading levels based on font size ranking
    const sortedClusters = clusters.sort((a, b) => b.avgFontSize - a.avgFontSize);
    
    this.clusters = sortedClusters.map((cluster, index) => ({
      ...cluster,
      id: index,
      headingLevel: this.getHeadingLevel(index, cluster),
      confidence: this.calculateClusterConfidence(cluster, features)
    }));

    return this.clusters;
  }

  private initializeClusters(features: any[], k: number) {
    const clusters = [];
    
    // Use k-means++ initialization
    const firstCenter = features[Math.floor(Math.random() * features.length)];
    clusters.push({ size: firstCenter.size, weight: firstCenter.weight });

    for (let i = 1; i < k; i++) {
      const distances = features.map(f => {
        const minDist = Math.min(...clusters.map(c => 
          Math.sqrt((f.size - c.size) ** 2 + (f.weight - c.weight) ** 2)
        ));
        return minDist ** 2;
      });

      const totalDist = distances.reduce((sum, d) => sum + d, 0);
      let target = Math.random() * totalDist;
      
      for (let j = 0; j < distances.length; j++) {
        target -= distances[j];
        if (target <= 0) {
          clusters.push({ size: features[j].size, weight: features[j].weight });
          break;
        }
      }
    }

    return clusters;
  }

  private assignToClusters(features: any[], clusters: any[]) {
    return features.map(feature => {
      let minDist = Infinity;
      let assignment = 0;

      clusters.forEach((cluster, index) => {
        const dist = Math.sqrt(
          (feature.size - cluster.size) ** 2 + 
          (feature.weight - cluster.weight) ** 2
        );
        if (dist < minDist) {
          minDist = dist;
          assignment = index;
        }
      });

      return assignment;
    });
  }

  private updateClusters(features: any[], assignments: number[], k: number) {
    const newClusters = [];

    for (let i = 0; i < k; i++) {
      const clusterFeatures = features.filter((_, index) => assignments[index] === i);
      
      if (clusterFeatures.length === 0) {
        // Handle empty cluster
        newClusters.push({ size: 12, weight: 0 });
        continue;
      }

      const avgSize = clusterFeatures.reduce((sum, f) => sum + f.size, 0) / clusterFeatures.length;
      const avgWeight = clusterFeatures.reduce((sum, f) => sum + f.weight, 0) / clusterFeatures.length;

      newClusters.push({ 
        size: avgSize, 
        weight: avgWeight,
        sampleCount: clusterFeatures.length
      });
    }

    return newClusters;
  }

  private clustersConverged(oldClusters: any[], newClusters: any[], threshold = 0.1) {
    return oldClusters.every((oldCluster, index) => {
      const newCluster = newClusters[index];
      return Math.abs(oldCluster.size - newCluster.size) < threshold &&
             Math.abs(oldCluster.weight - newCluster.weight) < threshold;
    });
  }

  private getHeadingLevel(index: number, cluster: any): string {
    // Determine heading level based on cluster ranking and characteristics
    if (index === 0 && cluster.avgFontSize > 16) return 'H1';
    if (index <= 1 && cluster.avgFontSize > 14) return 'H2';
    if (index <= 2 && cluster.avgFontSize > 12) return 'H3';
    if (cluster.weight > 0.5) return 'H4'; // Bold text
    return 'Body';
  }

  private calculateClusterConfidence(cluster: any, features: any[]): number {
    // Calculate confidence based on cluster cohesion and size
    const clusterFeatures = features.filter(f => 
      Math.abs(f.size - cluster.size) < 2 && Math.abs(f.weight - cluster.weight) < 0.5
    );
    
    const cohesion = clusterFeatures.length / features.length;
    const sizeConfidence = cluster.sampleCount > 3 ? 0.9 : 0.6;
    
    return Math.min(0.95, cohesion * 0.7 + sizeConfidence * 0.3);
  }
}

// Pattern matching for heading validation
class HeadingPatternMatcher {
  private patterns = [
    { regex: /^\d+\.\s+/, name: 'numbered_section', confidence: 0.9 },
    { regex: /^\d+\.\d+\s+/, name: 'numbered_subsection', confidence: 0.85 },
    { regex: /^(Chapter|Section|Part)\s+\d+/i, name: 'chapter_section', confidence: 0.95 },
    { regex: /^(Introduction|Conclusion|Abstract|Summary|References)/i, name: 'standard_section', confidence: 0.8 },
    { regex: /^[A-Z][A-Z\s]{2,}$/, name: 'all_caps', confidence: 0.7 },
    { regex: /^[A-Z][a-z\s]+$/, name: 'title_case', confidence: 0.6 }
  ];

  match(text: string): { pattern?: string; confidence: number } {
    for (const pattern of this.patterns) {
      if (pattern.regex.test(text.trim())) {
        return { pattern: pattern.name, confidence: pattern.confidence };
      }
    }
    return { confidence: 0.3 }; // Base confidence for unmatched text
  }

  // Multilingual pattern detection
  detectScript(text: string): 'latin' | 'devanagari' | 'arabic' | 'chinese' | 'unknown' {
    if (/[\u0900-\u097F]/.test(text)) return 'devanagari';
    if (/[\u0600-\u06FF]/.test(text)) return 'arabic';
    if (/[\u4E00-\u9FFF]/.test(text)) return 'chinese';
    if (/[a-zA-Z]/.test(text)) return 'latin';
    return 'unknown';
  }
}

// Main Style2Hierarchy processor
export class Style2HierarchyProcessor {
  private clusterer = new FontClusterer();
  private patternMatcher = new HeadingPatternMatcher();

  // Process extracted text blocks to identify document structure
  processDocument(textBlocks: TextBlock[]): {
    headings: HeadingCandidate[];
    clusters: ClusterInfo[];
    summary: {
      totalBlocks: number;
      headingCandidates: number;
      averageConfidence: number;
      processingTime: number;
    };
  } {
    const startTime = performance.now();

    // Step 1: Cluster font styles
    const clusters = this.clusterer.cluster(textBlocks);

    // Step 2: Identify heading candidates
    const headings = this.identifyHeadings(textBlocks, clusters);

    // Step 3: Validate with pattern matching
    const validatedHeadings = this.validateWithPatterns(headings);

    // Step 4: Calculate summary statistics
    const avgConfidence = validatedHeadings.reduce((sum, h) => sum + h.confidence, 0) / validatedHeadings.length;
    
    const processingTime = performance.now() - startTime;

    return {
      headings: validatedHeadings.sort((a, b) => b.confidence - a.confidence),
      clusters,
      summary: {
        totalBlocks: textBlocks.length,
        headingCandidates: validatedHeadings.length,
        averageConfidence: avgConfidence || 0,
        processingTime: Math.round(processingTime * 100) / 100
      }
    };
  }

  private identifyHeadings(textBlocks: TextBlock[], clusters: ClusterInfo[]): HeadingCandidate[] {
    const headings: HeadingCandidate[] = [];

    textBlocks.forEach(block => {
      // Find best matching cluster
      const clusterMatch = this.findBestCluster(block, clusters);
      
      // Only consider blocks from heading-level clusters
      if (clusterMatch.cluster.headingLevel !== 'Body') {
        const confidence = this.calculateHeadingConfidence(block, clusterMatch.cluster);
        
        if (confidence > 0.5) { // Threshold for heading candidates
          headings.push({
            text: block.text,
            level: clusterMatch.cluster.headingLevel,
            confidence,
            reason: `Font cluster ${clusterMatch.cluster.id} (${clusterMatch.cluster.headingLevel})`,
            page: block.page,
            position: { x: block.position.x, y: block.position.y },
            fontCluster: clusterMatch.cluster.id
          });
        }
      }
    });

    return headings;
  }

  private findBestCluster(block: TextBlock, clusters: ClusterInfo[]) {
    let bestMatch = { cluster: clusters[0], distance: Infinity };

    clusters.forEach(cluster => {
      const fontWeight = block.font.weight === 'bold' ? 1 : 0;
      const distance = Math.sqrt(
        (block.font.size - cluster.avgFontSize) ** 2 + 
        (fontWeight - (cluster.fontWeight === 'bold' ? 1 : 0)) ** 2
      );

      if (distance < bestMatch.distance) {
        bestMatch = { cluster, distance };
      }
    });

    return bestMatch;
  }

  private calculateHeadingConfidence(block: TextBlock, cluster: ClusterInfo): number {
    let confidence = cluster.confidence;

    // Boost confidence for typical heading characteristics
    if (block.text.length < 100) confidence += 0.1; // Short text
    if (block.font.weight === 'bold') confidence += 0.15; // Bold font
    if (block.position.x < 100) confidence += 0.1; // Left-aligned
    if (/^[A-Z]/.test(block.text)) confidence += 0.05; // Starts with capital

    // Penalize for body text characteristics
    if (block.text.length > 200) confidence -= 0.2; // Too long
    if (block.text.includes('.') && block.text.split('.').length > 2) confidence -= 0.15; // Multiple sentences

    return Math.min(0.95, Math.max(0.1, confidence));
  }

  private validateWithPatterns(headings: HeadingCandidate[]): HeadingCandidate[] {
    return headings.map(heading => {
      const patternMatch = this.patternMatcher.match(heading.text);
      const script = this.patternMatcher.detectScript(heading.text);

      // Adjust confidence based on pattern matching
      let adjustedConfidence = heading.confidence;
      if (patternMatch.pattern) {
        adjustedConfidence = (heading.confidence + patternMatch.confidence) / 2;
        heading.patternMatch = patternMatch.pattern;
      }

      // Script-specific adjustments
      if (script !== 'latin' && script !== 'unknown') {
        // For non-Latin scripts, rely more on position and font size
        adjustedConfidence = heading.confidence * 0.9; // Slight reduction for uncertainty
      }

      return {
        ...heading,
        confidence: Math.min(0.95, adjustedConfidence),
        reason: `${heading.reason}${patternMatch.pattern ? ` + ${patternMatch.pattern} pattern` : ''}`
      };
    });
  }
}

// Mock PDF parser for demonstration (in real implementation, this would use pdf-lib or similar)
export class PDFDocumentParser {
  // Simulate extracting text blocks from PDF
  static async extractTextBlocks(file: File): Promise<TextBlock[]> {
    // In a real implementation, this would use pdf-lib to extract actual text and font information
    // For demo purposes, we'll generate realistic mock data
    
    const mockBlocks: TextBlock[] = [
      {
        text: "Machine Learning in Document Analysis",
        font: { size: 18, weight: "bold", style: "normal", family: "Arial" },
        position: { x: 50, y: 100, width: 400, height: 24 },
        page: 1
      },
      {
        text: "1. Introduction",
        font: { size: 16, weight: "bold", style: "normal", family: "Arial" },
        position: { x: 50, y: 150, width: 200, height: 20 },
        page: 1
      },
      {
        text: "Document understanding has become increasingly important in the digital age. This paper presents novel approaches to automatic document structure extraction using machine learning techniques.",
        font: { size: 12, weight: "normal", style: "normal", family: "Arial" },
        position: { x: 50, y: 180, width: 500, height: 48 },
        page: 1
      },
      {
        text: "1.1 Related Work",
        font: { size: 14, weight: "bold", style: "normal", family: "Arial" },
        position: { x: 50, y: 250, width: 180, height: 18 },
        page: 1
      },
      {
        text: "Previous research in this field has focused primarily on rule-based approaches. However, these methods often fail to generalize across different document types and layouts.",
        font: { size: 12, weight: "normal", style: "normal", family: "Arial" },
        position: { x: 50, y: 280, width: 500, height: 36 },
        page: 1
      },
      {
        text: "2. Methodology",
        font: { size: 16, weight: "bold", style: "normal", family: "Arial" },
        position: { x: 50, y: 350, width: 200, height: 20 },
        page: 1
      },
      {
        text: "2.1 Data Collection",
        font: { size: 14, weight: "bold", style: "normal", family: "Arial" },
        position: { x: 50, y: 380, width: 180, height: 18 },
        page: 1
      },
      {
        text: "We collected a diverse dataset of academic papers, technical reports, and business documents to ensure robust model training.",
        font: { size: 12, weight: "normal", style: "normal", family: "Arial" },
        position: { x: 50, y: 410, width: 500, height: 24 },
        page: 1
      }
    ];

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockBlocks;
  }
}