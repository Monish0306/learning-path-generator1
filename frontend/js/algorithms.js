// ==================== DAA ALGORITHMS IMPLEMENTATION ====================
// This file demonstrates actual Design and Analysis of Algorithms used in the project

// ==================== 1. DIRECTED ACYCLIC GRAPH (DAG) ====================
/**
 * DAG is used to represent topic prerequisites
 * Each topic is a node, prerequisites are directed edges
 */
class DAG {
    constructor() {
        this.adjacencyList = new Map();
        this.topicData = new Map();
    }
    
    addTopic(topicId, data) {
        if (!this.adjacencyList.has(topicId)) {
            this.adjacencyList.set(topicId, []);
            this.topicData.set(topicId, data);
        }
    }
    
    addPrerequisite(prereq, topic) {
        if (!this.adjacencyList.has(prereq)) {
            this.addTopic(prereq, { name: prereq });
        }
        if (!this.adjacencyList.has(topic)) {
            this.addTopic(topic, { name: topic });
        }
        this.adjacencyList.get(prereq).push(topic);
    }
    
    getPrerequisites(topicId) {
        const prereqs = [];
        for (const [source, targets] of this.adjacencyList.entries()) {
            if (targets.includes(topicId)) {
                prereqs.push(source);
            }
        }
        return prereqs;
    }
    
    getDependents(topicId) {
        return this.adjacencyList.get(topicId) || [];
    }
}

// ==================== 2. TOPOLOGICAL SORT (KAHN'S ALGORITHM) ====================
/**
 * Used to determine valid learning order
 * Ensures prerequisites are completed before advanced topics
 * Time Complexity: O(V + E) where V = topics, E = prerequisites
 */
function topologicalSort(dag) {
    const inDegree = new Map();
    const queue = [];
    const result = [];
    
    // Initialize in-degrees
    for (const node of dag.adjacencyList.keys()) {
        inDegree.set(node, 0);
    }
    
    // Calculate in-degrees
    for (const [_, neighbors] of dag.adjacencyList.entries()) {
        for (const neighbor of neighbors) {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
        }
    }
    
    // Find all nodes with in-degree 0 (no prerequisites)
    for (const [node, degree] of inDegree.entries()) {
        if (degree === 0) {
            queue.push(node);
        }
    }
    
    // Process queue using BFS
    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);
        
        // Reduce in-degree of neighbors
        const neighbors = dag.adjacencyList.get(current) || [];
        for (const neighbor of neighbors) {
            const newDegree = inDegree.get(neighbor) - 1;
            inDegree.set(neighbor, newDegree);
            
            if (newDegree === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // Check for cycles
    if (result.length !== dag.adjacencyList.size) {
        throw new Error('Graph contains a cycle - invalid prerequisite structure');
    }
    
    return result;
}

// ==================== 3. PRIORITY QUEUE (MIN HEAP) ====================
/**
 * Used for efficient topic selection based on priority
 * Time Complexity: Insert O(log n), Extract-Min O(log n)
 */
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    enqueue(item, priority) {
        this.heap.push({ item, priority });
        this.bubbleUp(this.heap.length - 1);
    }
    
    dequeue() {
        if (this.isEmpty()) return null;
        
        const min = this.heap[0];
        const last = this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        
        return min;
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.heap[index].priority >= this.heap[parentIndex].priority) {
                break;
            }
            
            [this.heap[index], this.heap[parentIndex]] = 
                [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    bubbleDown(index) {
        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let smallest = index;
            
            if (leftChild < this.heap.length && 
                this.heap[leftChild].priority < this.heap[smallest].priority) {
                smallest = leftChild;
            }
            
            if (rightChild < this.heap.length && 
                this.heap[rightChild].priority < this.heap[smallest].priority) {
                smallest = rightChild;
            }
            
            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}

// ==================== 4. GREEDY ALGORITHM ====================
/**
 * Used to prioritize topics that unlock more future topics
 * Selects topics with most dependents first
 * Time Complexity: O(n log n) for sorting
 */
function greedyTopicSelection(dag, masteredTopics, limit = 3) {
    const available = [];
    
    for (const topicId of dag.adjacencyList.keys()) {
        if (masteredTopics.has(topicId)) continue;
        
        // Check if all prerequisites are mastered
        const prereqs = dag.getPrerequisites(topicId);
        const allPrereqsMastered = prereqs.every(p => masteredTopics.has(p));
        
        if (allPrereqsMastered) {
            const dependentCount = dag.getDependents(topicId).length;
            available.push({
                topicId,
                priority: dependentCount,  // Greedy: choose topics that unlock more
                difficulty: dag.topicData.get(topicId)?.difficulty || 1
            });
        }
    }
    
    // Sort by priority (greedy choice: most dependents first)
    available.sort((a, b) => {
        if (b.priority !== a.priority) {
            return b.priority - a.priority;
        }
        return a.difficulty - b.difficulty;  // Tie-breaker: easier first
    });
    
    return available.slice(0, limit).map(item => item.topicId);
}

// ==================== 5. A* SEARCH ALGORITHM ====================
/**
 * Finds optimal learning path from current state to goal
 * Heuristic: Estimated effort to master remaining topics
 * Time Complexity: O(b^d) where b=branching factor, d=depth
 */
class AStarLearningPath {
    constructor(dag) {
        this.dag = dag;
    }
    
    // Heuristic: estimate cost to reach goal from current state
    heuristic(mastered, goalTopic) {
        if (mastered.has(goalTopic)) return 0;
        
        // BFS to find all topics needed
        const queue = [goalTopic];
        const needed = new Set([goalTopic]);
        const visited = new Set([goalTopic]);
        
        while (queue.length > 0) {
            const current = queue.shift();
            const prereqs = this.dag.getPrerequisites(current);
            
            for (const prereq of prereqs) {
                if (!mastered.has(prereq) && !visited.has(prereq)) {
                    needed.add(prereq);
                    visited.add(prereq);
                    queue.push(prereq);
                }
            }
        }
        
        // Sum difficulties of needed topics
        let cost = 0;
        for (const topicId of needed) {
            cost += this.dag.topicData.get(topicId)?.difficulty || 1;
        }
        
        return cost;
    }
    
    // Find optimal path using A*
    findPath(currentMastered, goalTopic) {
        const pq = new PriorityQueue();
        const startState = JSON.stringify(Array.from(currentMastered).sort());
        
        const gScore = new Map();  // Actual cost from start
        const fScore = new Map();  // gScore + heuristic
        const cameFrom = new Map();
        
        gScore.set(startState, 0);
        fScore.set(startState, this.heuristic(currentMastered, goalTopic));
        
        pq.enqueue({
            mastered: currentMastered,
            lastTopic: null
        }, fScore.get(startState));
        
        while (!pq.isEmpty()) {
            const { item: current } = pq.dequeue();
            const currentState = JSON.stringify(Array.from(current.mastered).sort());
            
            if (current.mastered.has(goalTopic)) {
                return this.reconstructPath(cameFrom, current);
            }
            
            // Get available next topics
            const available = this.getAvailableTopics(current.mastered);
            
            for (const nextTopic of available) {
                const newMastered = new Set(current.mastered);
                newMastered.add(nextTopic);
                const newState = JSON.stringify(Array.from(newMastered).sort());
                
                const topicCost = this.dag.topicData.get(nextTopic)?.difficulty || 1;
                const tentativeGScore = gScore.get(currentState) + topicCost;
                
                if (!gScore.has(newState) || tentativeGScore < gScore.get(newState)) {
                    cameFrom.set(newState, {
                        state: currentState,
                        topic: nextTopic
                    });
                    
                    gScore.set(newState, tentativeGScore);
                    const h = this.heuristic(newMastered, goalTopic);
                    fScore.set(newState, tentativeGScore + h);
                    
                    pq.enqueue({
                        mastered: newMastered,
                        lastTopic: nextTopic
                    }, fScore.get(newState));
                }
            }
        }
        
        return null;  // No path found
    }
    
    getAvailableTopics(mastered) {
        const available = [];
        
        for (const topicId of this.dag.adjacencyList.keys()) {
            if (mastered.has(topicId)) continue;
            
            const prereqs = this.dag.getPrerequisites(topicId);
            const allPrereqsMastered = prereqs.every(p => mastered.has(p));
            
            if (allPrereqsMastered) {
                available.push(topicId);
            }
        }
        
        return available;
    }
    
    reconstructPath(cameFrom, current) {
        const path = [];
        let currentState = JSON.stringify(Array.from(current.mastered).sort());
        
        while (cameFrom.has(currentState)) {
            const prev = cameFrom.get(currentState);
            if (prev.topic) {
                path.unshift(prev.topic);
            }
            currentState = prev.state;
        }
        
        return path;
    }
}

// ==================== 6. DYNAMIC PROGRAMMING (MEMOIZATION) ====================
/**
 * Used to cache mastery scores to avoid recalculation
 * Time Complexity: O(1) for lookup after initial calculation
 */
class MasteryCache {
    constructor() {
        this.cache = new Map();
    }
    
    // Store mastery score with timestamp
    set(topicId, score) {
        this.cache.set(topicId, {
            score,
            timestamp: Date.now()
        });
    }
    
    // Get cached score
    get(topicId) {
        const cached = this.cache.get(topicId);
        return cached ? cached.score : null;
    }
    
    // Check if score needs recalculation (older than 7 days)
    isStale(topicId) {
        const cached = this.cache.get(topicId);
        if (!cached) return true;
        
        const daysSince = (Date.now() - cached.timestamp) / (1000 * 60 * 60 * 24);
        return daysSince > 7;
    }
    
    // Clear all cached scores
    clear() {
        this.cache.clear();
    }
}

// ==================== COMPLEXITY ANALYSIS ====================
/**
 * Space Complexity Analysis:
 * - DAG: O(V + E) where V = number of topics, E = number of prerequisites
 * - Topological Sort: O(V) for queue and in-degree map
 * - Priority Queue: O(n) where n = number of items in queue
 * - A* Search: O(b^d) where b = branching factor, d = depth
 * - Mastery Cache: O(V) for storing all topic scores
 * 
 * Time Complexity Analysis:
 * - DAG operations: O(1) for add, O(V) for getPrerequisites
 * - Topological Sort: O(V + E) using Kahn's algorithm
 * - Priority Queue: O(log n) for insert/extract
 * - Greedy Selection: O(n log n) for sorting available topics
 * - A* Search: O(b^d) in worst case, much better with good heuristic
 * - Mastery Cache: O(1) for get/set
 * 
 * Overall System Complexity:
 * - Initial path generation: O(V + E + V log V) ≈ O(V log V)
 * - Path update after quiz: O(V log V) for regeneration
 * - Topic recommendation: O(V) to check prerequisites
 */

// ==================== USAGE EXAMPLES ====================

// Example 1: Create a DAG for Python topics
function createPythonDAG() {
    const dag = new DAG();
    
    dag.addTopic('basics', { name: 'Python Basics', difficulty: 1 });
    dag.addTopic('control', { name: 'Control Flow', difficulty: 2 });
    dag.addTopic('functions', { name: 'Functions', difficulty: 2 });
    dag.addTopic('oop', { name: 'OOP', difficulty: 4 });
    
    dag.addPrerequisite('basics', 'control');
    dag.addPrerequisite('basics', 'functions');
    dag.addPrerequisite('control', 'oop');
    dag.addPrerequisite('functions', 'oop');
    
    return dag;
}

// Example 2: Get learning order
function getLearningOrder() {
    const dag = createPythonDAG();
    const order = topologicalSort(dag);
    console.log('Learning order:', order);
    // Output: ['basics', 'control', 'functions', 'oop']
}

// Example 3: Find next topics to study
function getNextTopics() {
    const dag = createPythonDAG();
    const mastered = new Set(['basics', 'control']);
    const next = greedyTopicSelection(dag, mastered, 2);
    console.log('Next topics:', next);
    // Output: ['functions'] (prerequisites met, unlocks OOP)
}

// Example 4: Find optimal path using A*
function findOptimalPath() {
    const dag = createPythonDAG();
    const astar = new AStarLearningPath(dag);
    const mastered = new Set(['basics']);
    const path = astar.findPath(mastered, 'oop');
    console.log('Optimal path to OOP:', path);
    // Output: ['control', 'functions', 'oop'] or ['functions', 'control', 'oop']
}

// Example 5: Use priority queue for topic selection
function prioritizeTopics() {
    const pq = new PriorityQueue();
    
    pq.enqueue('basics', 1);      // High priority (low number)
    pq.enqueue('advanced', 10);   // Low priority (high number)
    pq.enqueue('intermediate', 5);
    
    console.log('Study order:');
    while (!pq.isEmpty()) {
        const { item } = pq.dequeue();
        console.log(item);
    }
    // Output: basics, intermediate, advanced
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DAG,
        topologicalSort,
        PriorityQueue,
        greedyTopicSelection,
        AStarLearningPath,
        MasteryCache,
        createPythonDAG,
        getLearningOrder,
        getNextTopics,
        findOptimalPath,
        prioritizeTopics
    };
}

console.log('✅ DAA Algorithms loaded successfully!');
console.log('📊 Available algorithms:');
console.log('  1. DAG - Directed Acyclic Graph');
console.log('  2. Topological Sort (Kahn\'s Algorithm)');
console.log('  3. Priority Queue (Min Heap)');
console.log('  4. Greedy Algorithm');
console.log('  5. A* Search');
console.log('  6. Dynamic Programming (Memoization)');