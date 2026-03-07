// ==================== REFERENCE LINKS DATABASE ====================
// FIXED VERSION with proper subject and topic ID mapping

const REFERENCE_LINKS = {
    // Map actual subject IDs to reference keys
    'python': {
        'basics': {
            'Variables': [
                { title: '📺 Variables and Data Types - YouTube Part 1', url: 'https://youtu.be/a43BIxiZ5EM?si=MIchtKCR0jIGxJ2O' },
                { title: '📺 Variables and Data Types - YouTube Part 2', url: 'https://youtu.be/TTepNRy0wj8?si=xlUGwuxzNNyrWmMK' },
                { title: '📚 Python Variables - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-variables/' }
            ],
            'Data Types': [
                { title: '📺 Variables and Data Types - YouTube', url: 'https://youtu.be/a43BIxiZ5EM?si=MIchtKCR0jIGxJ2O' },
                { title: '📚 Python Data Types - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-data-types/' }
            ],
            'Operators': [
                { title: '📚 Python Operators - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-operators/' }
            ]
        },
        'control': {
            'If-Else': [
                { title: '📺 Control Flow - YouTube', url: 'https://youtu.be/S73thl0AyFU?si=7VMomcXhnSBwWViZ' },
                { title: '📚 Control Flow Statements - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-if-else/' }
            ],
            'Loops': [
                { title: '📺 Control Flow - YouTube', url: 'https://youtu.be/S73thl0AyFU?si=7VMomcXhnSBwWViZ' },
                { title: '📚 Python Loops - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-for-loops/' }
            ],
            'Break & Continue': [
                { title: '📺 Control Flow - YouTube', url: 'https://youtu.be/S73thl0AyFU?si=7VMomcXhnSBwWViZ' },
                { title: '📚 Break and Continue - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-break-continue-pass/' }
            ]
        },
        'functions': {
            'Defining Functions': [
                { title: '📺 Function Basics - YouTube', url: 'https://youtu.be/u-OmVr_fT4s?si=kWcuuNKC4yO5jfsL' },
                { title: '📚 Python Functions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-functions/' }
            ],
            'Parameters': [
                { title: '📺 Function Basics - YouTube', url: 'https://youtu.be/u-OmVr_fT4s?si=kWcuuNKC4yO5jfsL' },
                { title: '📚 Function Parameters - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/args-kwargs-python/' }
            ],
            'Return Values': [
                { title: '📺 Function Basics - YouTube', url: 'https://youtu.be/u-OmVr_fT4s?si=kWcuuNKC4yO5jfsL' },
                { title: '📚 Return Statement - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-return-statement/' }
            ],
            'Lambda': [
                { title: '📺 Lambda Functions - YouTube', url: 'https://youtu.be/P8MdDCTbMOI?si=rLLV2B2qhuP_NChZ' },
                { title: '📚 Python Lambda - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-lambda-anonymous-functions-filter-map-reduce/' }
            ]
        },
        'data_structures': {
            'Lists': [
                { title: '📺 Lists and Collections - YouTube', url: 'https://youtu.be/W8KRzm-HUcc?si=wU1ZBre4mU00IY1k' },
                { title: '📺 Lists Operations - YouTube', url: 'https://youtu.be/NejbU3CVQdg?si=ksNo7Y7ZJJpF7aXj' },
                { title: '📚 Python Lists - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-list/' }
            ],
            'Tuples': [
                { title: '📺 Tuples - YouTube', url: 'https://youtu.be/zLFituJxj6c?si=jYCyNcJRBHB0eUnp' },
                { title: '📚 Python Tuples - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-tuples/' }
            ],
            'Sets': [
                { title: '📺 Dictionaries and Sets - YouTube', url: 'https://youtu.be/078tYSD7K8E?si=tojv3OfC5qwTHRQ4' },
                { title: '📚 Python Sets - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-sets/' }
            ],
            'Dictionaries': [
                { title: '📺 Dictionaries and Sets - YouTube', url: 'https://youtu.be/078tYSD7K8E?si=tojv3OfC5qwTHRQ4' },
                { title: '📚 Python Dictionaries - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-dictionary/' }
            ]
        },
        'oop': {
            'Classes': [
                { title: '📺 Classes and Objects - YouTube', url: 'https://youtu.be/Gvm2Sg1rZek?si=0lYrFq9TaJWL8OGf' },
                { title: '📚 Classes and Objects - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-classes-and-objects/' }
            ],
            'Objects': [
                { title: '📺 Classes and Objects - YouTube', url: 'https://youtu.be/Gvm2Sg1rZek?si=0lYrFq9TaJWL8OGf' },
                { title: '📚 Classes and Objects - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-classes-and-objects/' }
            ],
            'Inheritance': [
                { title: '📺 Inheritance - YouTube', url: 'https://youtu.be/Gvm2Sg1rZek?si=0lYrFq9TaJWL8OGf' },
                { title: '📚 Inheritance - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/inheritance-in-python/' }
            ],
            'Polymorphism': [
                { title: '📺 Polymorphism - YouTube', url: 'https://youtu.be/Gvm2Sg1rZek?si=0lYrFq9TaJWL8OGf' },
                { title: '📚 Polymorphism - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/polymorphism-in-python/' }
            ]
        },
        'file_handling': {
            'Reading Files': [
                { title: '📺 File Operations - YouTube', url: 'https://youtu.be/Sx1Hjr67xO0?si=uND3MftRFVWz8CxF' },
                { title: '📚 File Handling Python - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/file-handling-python/' }
            ],
            'Writing Files': [
                { title: '📺 File Operations - YouTube', url: 'https://youtu.be/Sx1Hjr67xO0?si=uND3MftRFVWz8CxF' },
                { title: '📚 File Handling Python - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/file-handling-python/' }
            ],
            'CSV/JSON': [
                { title: '📺 File Operations - YouTube', url: 'https://youtu.be/Sx1Hjr67xO0?si=uND3MftRFVWz8CxF' },
                { title: '📚 JSON in Python - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/read-write-and-parse-json-using-python/' }
            ]
        },
        'exceptions': {
            'Try-Except': [
                { title: '📺 Exception Handling - YouTube', url: 'https://youtu.be/6SPDvPK38tw?si=JRQO5CTJQNJLaV9k' },
                { title: '📚 Exception Handling - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-exception-handling/' }
            ],
            'Raising Exceptions': [
                { title: '📺 Exception Handling - YouTube', url: 'https://youtu.be/6SPDvPK38tw?si=JRQO5CTJQNJLaV9k' },
                { title: '📚 Python Raise - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-raise-keyword/' }
            ],
            'Custom Exceptions': [
                { title: '📺 Exception Handling - YouTube', url: 'https://youtu.be/6SPDvPK38tw?si=JRQO5CTJQNJLaV9k' },
                { title: '📚 Custom Exceptions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/user-defined-exceptions-python-examples/' }
            ]
        },
        'modules': {
            'Import': [
                { title: '📺 Modules - YouTube', url: 'https://youtu.be/u-OmVr_fT4s?si=kWcuuNKC4yO5jfsL' },
                { title: '📚 Python Modules - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-modules/' }
            ],
            'Creating Modules': [
                { title: '📚 Python Modules - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-modules/' }
            ],
            'Popular Libraries': [
                { title: '📚 Python Libraries - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/libraries-in-python/' }
            ]
        }
    },

    'c': {
        'basics': {
            'Variables': [
                { title: '📺 Introduction to C - YouTube', url: 'https://youtu.be/EjavYOFoJJ0?si=1xlDmX5u2FuImdJe' },
                { title: '📺 Data Types - YouTube', url: 'https://youtu.be/NyT9vvSBoeo?si=qBzP3VZL84KEwlTx' },
                { title: '📚 C Language Introduction - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c-language-introduction/' }
            ],
            'Data Types': [
                { title: '📺 Data Types - YouTube', url: 'https://youtu.be/NyT9vvSBoeo?si=qBzP3VZL84KEwlTx' },
                { title: '📚 Data Types in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-types-in-c/' }
            ],
            'Operators': [
                { title: '📺 Operators - YouTube', url: 'https://youtu.be/E1_Gg6dURwk?si=3ti_yi2ZIZNf1wwl' },
                { title: '📚 Operators in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/operators-in-c/' }
            ],
            'Input/Output': [
                { title: '📺 Introduction to C - YouTube', url: 'https://youtu.be/EjavYOFoJJ0?si=1xlDmX5u2FuImdJe' },
                { title: '📚 Input/Output in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/basic-input-and-output-in-c/' }
            ]
        },
        'control': {
            'If-Else': [
                { title: '📺 If Statement - YouTube', url: 'https://youtu.be/oYuRtXcwXqw?si=xuQq3VdC-37-sQmi' },
                { title: '📺 If-Else - YouTube', url: 'https://youtu.be/oWTnLzWkF5w?si=2hu3dIcAcZZgYzrK' },
                { title: '📚 Decision Making in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/' }
            ],
            'Switch': [
                { title: '📺 Switch - YouTube', url: 'https://youtu.be/BHS4iA7bsDk?si=HWPJYS6yVmRHQbE1' },
                { title: '📚 Switch Statement - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/switch-statement-in-c/' }
            ],
            'Loops': [
                { title: '📺 For Loop - YouTube', url: 'https://youtu.be/agl3vjzbG2o?si=B2rPBBdn3mZVYUTu' },
                { title: '📺 While Loop - YouTube', url: 'https://youtu.be/IGuoF98qEG0?si=CGi4oFCxXmCufUUF' },
                { title: '📺 Do-While Loop - YouTube', url: 'https://youtu.be/nohmBtIby_k?si=uTTr7buJzyT9acaQ' },
                { title: '📚 C Loops - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c-loops/' }
            ]
        },
        'functions': {
            'Function Declaration': [
                { title: '📺 Function Fundamentals - YouTube', url: 'https://youtu.be/f--fD8Y0RnA?si=HG626qDvmau1tB97' },
                { title: '📚 C Functions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c-functions/' }
            ],
            'Parameters': [
                { title: '📺 Function Fundamentals - YouTube', url: 'https://youtu.be/f--fD8Y0RnA?si=HG626qDvmau1tB97' },
                { title: '📚 Function Parameters - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/parameter-passing-techniques-in-c-cpp/' }
            ],
            'Recursion': [
                { title: '📺 Function Fundamentals - YouTube', url: 'https://youtu.be/f--fD8Y0RnA?si=HG626qDvmau1tB97' },
                { title: '📚 Recursion in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/recursion-in-c/' }
            ]
        },
        'arrays': {
            '1D Arrays': [
                { title: '📺 1D Arrays - YouTube', url: 'https://youtu.be/08LWytp6PNI?si=4ZuTC-KP0-mlzEO4' },
                { title: '📚 C Arrays - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c-arrays/' }
            ],
            '2D Arrays': [
                { title: '📺 2D Arrays - YouTube', url: 'https://youtu.be/HMBYWhpP8i4?si=4B0xBHmpWSY0RkFz' },
                { title: '📚 Multidimensional Arrays - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/multidimensional-arrays-c-cpp/' }
            ],
            'Array Operations': [
                { title: '📺 1D Arrays - YouTube', url: 'https://youtu.be/08LWytp6PNI?si=4ZuTC-KP0-mlzEO4' },
                { title: '📚 Array Operations - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c-arrays/' }
            ]
        },
        'pointers': {
            'Pointer Basics': [
                { title: '📺 Pointers Intro - YouTube', url: 'https://youtu.be/IuDJeGqEZ3A?si=pwwtxjKWYLw0juY8' },
                { title: '📺 Single Pointer - YouTube', url: 'https://youtu.be/qqRUp28pPFk?si=7Jm-5E7UwMEMFZQG' },
                { title: '📚 C Pointers - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c-pointers/' }
            ],
            'Pointer Arithmetic': [
                { title: '📺 Pointers Intro - YouTube', url: 'https://youtu.be/IuDJeGqEZ3A?si=pwwtxjKWYLw0juY8' },
                { title: '📚 Pointer Arithmetic - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/pointer-arithmetics-in-c-with-examples/' }
            ],
            'Pointers & Arrays': [
                { title: '📺 Double Pointers - YouTube', url: 'https://youtu.be/TPNYntM-5o4?si=LW6XMTmeXJZE4hcF' },
                { title: '📚 Pointers and Arrays - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/pointer-array-array-pointer/' }
            ]
        },
        'strings': {
            'String Operations': [
                { title: '📚 C Strings - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/strings-in-c/' }
            ],
            'String Functions': [
                { title: '📚 String Functions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c-string-functions/' }
            ],
            'String Pointers': [
                { title: '📚 Pointers and Strings - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/pointer-array-array-pointer/' }
            ]
        },
        'structures': {
            'Structure Definition': [
                { title: '📚 C Structures - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/structures-c/' }
            ],
            'Nested Structures': [
                { title: '📚 Nested Structures - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/nested-structure-in-c/' }
            ],
            'Unions': [
                { title: '📚 Union in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c-unions/' }
            ]
        },
        'file_handling': {
            'File Operations': [
                { title: '📚 File Handling in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/basics-file-handling-c/' }
            ],
            'fopen/fclose': [
                { title: '📚 File Handling in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/basics-file-handling-c/' }
            ],
            'Reading/Writing': [
                { title: '📚 File I/O in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/input-output-system-calls-c-create-open-close-read-write/' }
            ]
        }
    },

    'daa': {
        'intro': {
            'What is Algorithm': [
                { title: '📺 Algorithms Introduction - YouTube', url: 'https://youtu.be/9TlHvipP5yA?si=LEZsxdjSkNYso0Wp' },
                { title: '📚 Algorithm - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-to-algorithms/' }
            ],
            'Complexity': [
                { title: '📺 Time and Space Complexity - YouTube', url: 'https://youtu.be/9TlHvipP5yA?si=LEZsxdjSkNYso0Wp' },
                { title: '📚 Time Complexity - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/understanding-time-complexity-simple-examples/' }
            ],
            'Big-O Notation': [
                { title: '📺 Asymptotic Notations - YouTube', url: 'https://youtu.be/A03oI0znAoc?si=hoe2YasvtpXHYjpg' },
                { title: '📚 Asymptotic Notations - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/types-of-asymptotic-notations-in-complexity-analysis-of-algorithms/' }
            ]
        },
        'sorting': {
            'Bubble Sort': [
                { title: '📺 Basic Sorting - YouTube', url: 'https://youtu.be/1jCFUv-Xlqo?si=DWBzAG9WdwjcC8DO' },
                { title: '📚 Bubble Sort - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/bubble-sort/' }
            ],
            'Quick Sort': [
                { title: '📺 Advanced Sorting - YouTube', url: 'https://youtu.be/9crZRd8GPWM?si=dYm5cpXPn-HdHvzT' },
                { title: '📚 Quick Sort - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/quick-sort/' }
            ],
            'Merge Sort': [
                { title: '📺 Advanced Sorting - YouTube', url: 'https://youtu.be/9crZRd8GPWM?si=dYm5cpXPn-HdHvzT' },
                { title: '📚 Merge Sort - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/merge-sort/' }
            ],
            'Heap Sort': [
                { title: '📺 Advanced Sorting - YouTube', url: 'https://youtu.be/9crZRd8GPWM?si=dYm5cpXPn-HdHvzT' },
                { title: '📚 Heap Sort - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/heap-sort/' }
            ]
        },
        'searching': {
            'Linear Search': [
                { title: '📚 Linear Search - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/linear-search/' }
            ],
            'Binary Search': [
                { title: '📚 Binary Search - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/binary-search/' }
            ],
            'Hashing': [
                { title: '📚 Hashing - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/hashing-data-structure/' }
            ]
        },
        'greedy': {
            'Activity Selection': [
                { title: '📚 Greedy Algorithms - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/greedy-algorithms/' }
            ],
            'Huffman Coding': [
                { title: '📚 Huffman Coding - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/' }
            ],
            'Knapsack': [
                { title: '📚 Fractional Knapsack - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/fractional-knapsack-problem/' }
            ]
        },
        'divide_conquer': {
            'Merge Sort': [
                { title: '📺 Advanced Sorting - YouTube', url: 'https://youtu.be/9crZRd8GPWM?si=dYm5cpXPn-HdHvzT' },
                { title: '📚 Merge Sort - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/merge-sort/' }
            ],
            'Quick Sort': [
                { title: '📺 Advanced Sorting - YouTube', url: 'https://youtu.be/9crZRd8GPWM?si=dYm5cpXPn-HdHvzT' },
                { title: '📚 Quick Sort - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/quick-sort/' }
            ],
            'Binary Search': [
                { title: '📚 Binary Search - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/binary-search/' }
            ]
        },
        'dynamic_programming': {
            'Fibonacci': [
                { title: '📺 DP Fundamentals - YouTube', url: 'https://youtu.be/5dRGRueKU3M?si=sW32Sxehpe1LemZt' },
                { title: '📚 Dynamic Programming - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dynamic-programming/' }
            ],
            'LCS': [
                { title: '📺 DP Fundamentals - YouTube', url: 'https://youtu.be/5dRGRueKU3M?si=sW32Sxehpe1LemZt' },
                { title: '📚 Longest Common Subsequence - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/' }
            ],
            'Knapsack': [
                { title: '📺 DP Fundamentals - YouTube', url: 'https://youtu.be/5dRGRueKU3M?si=sW32Sxehpe1LemZt' },
                { title: '📚 0-1 Knapsack - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/' }
            ],
            'Matrix Chain': [
                { title: '📺 DP Fundamentals - YouTube', url: 'https://youtu.be/5dRGRueKU3M?si=sW32Sxehpe1LemZt' },
                { title: '📚 Matrix Chain Multiplication - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/' }
            ]
        },
        'graphs': {
            'BFS': [
                { title: '📺 Graph Traversal - YouTube', url: 'https://youtu.be/vf-cxgUXcMk?si=TKYBLRv3cTJ9YXkv' },
                { title: '📚 BFS - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/' }
            ],
            'DFS': [
                { title: '📺 Graph Traversal - YouTube', url: 'https://youtu.be/vf-cxgUXcMk?si=TKYBLRv3cTJ9YXkv' },
                { title: '📚 DFS - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/' }
            ],
            'Dijkstra': [
                { title: '📺 Graph Traversal - YouTube', url: 'https://youtu.be/vf-cxgUXcMk?si=TKYBLRv3cTJ9YXkv' },
                { title: '📚 Dijkstra Algorithm - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/' }
            ],
            'Prims': [
                { title: '📚 Prims Algorithm - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/' }
            ],
            'Kruskals': [
                { title: '📚 Kruskals Algorithm - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/' }
            ]
        },
        'backtracking': {
            'N-Queens': [
                { title: '📚 N-Queens Problem - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/' }
            ],
            'Sudoku': [
                { title: '📚 Sudoku Solver - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sudoku-backtracking-7/' }
            ],
            'Graph Coloring': [
                { title: '📚 Graph Coloring - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/graph-coloring-applications/' }
            ]
        }
    },

    'ml': {
        'intro': {
            'Types of ML': [
                { title: '📺 Introduction to ML - YouTube', url: 'https://youtu.be/T3PsRW6wZSY?si=LDSYSi_QN0F-tBxi' },
                { title: '📚 Introduction to ML - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-machine-learning/' }
            ],
            'Supervised vs Unsupervised': [
                { title: '📺 Introduction to ML - YouTube', url: 'https://youtu.be/T3PsRW6wZSY?si=LDSYSi_QN0F-tBxi' },
                { title: '📚 Types of Learning - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/supervised-unsupervised-learning/' }
            ],
            'Applications': [
                { title: '📺 Introduction to ML - YouTube', url: 'https://youtu.be/T3PsRW6wZSY?si=LDSYSi_QN0F-tBxi' },
                { title: '📚 ML Applications - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/top-10-machine-learning-applications-real-world/' }
            ]
        },
        'linear_regression': {
            'Simple Linear': [
                { title: '📺 Regression Algorithms - YouTube', url: 'https://youtu.be/xLdvMG5qAmo?si=GJAgoBVk9eDCmjr3' },
                { title: '📚 Linear Regression - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/ml-linear-regression/' }
            ],
            'Multiple Linear': [
                { title: '📺 Regression Algorithms - YouTube', url: 'https://youtu.be/xLdvMG5qAmo?si=GJAgoBVk9eDCmjr3' },
                { title: '📚 Multiple Linear Regression - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/ml-multiple-linear-regression-using-python/' }
            ],
            'Gradient Descent': [
                { title: '📺 Regression Algorithms - YouTube', url: 'https://youtu.be/xLdvMG5qAmo?si=GJAgoBVk9eDCmjr3' },
                { title: '📚 Gradient Descent - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/gradient-descent-algorithm-and-its-variants/' }
            ]
        },
        'logistic_regression': {
            'Binary Classification': [
                { title: '📺 Classification Algorithms - YouTube', url: 'https://youtu.be/z18nw4adsx4?si=QZ9DYY6UmJRcY2Ug' },
                { title: '📚 Logistic Regression - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/understanding-logistic-regression/' }
            ],
            'Sigmoid Function': [
                { title: '📺 Classification Algorithms - YouTube', url: 'https://youtu.be/z18nw4adsx4?si=QZ9DYY6UmJRcY2Ug' },
                { title: '📚 Sigmoid Function - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/derivative-of-the-sigmoid-function/' }
            ],
            'Cost Function': [
                { title: '📺 Classification Algorithms - YouTube', url: 'https://youtu.be/z18nw4adsx4?si=QZ9DYY6UmJRcY2Ug' },
                { title: '📚 Cost Function - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/ml-cost-function-in-logistic-regression/' }
            ]
        },
        'decision_trees': {
            'ID3': [
                { title: '📺 Classification Algorithms - YouTube', url: 'https://youtu.be/z18nw4adsx4?si=QZ9DYY6UmJRcY2Ug' },
                { title: '📚 Decision Trees - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/decision-tree/' }
            ],
            'CART': [
                { title: '📺 Classification Algorithms - YouTube', url: 'https://youtu.be/z18nw4adsx4?si=QZ9DYY6UmJRcY2Ug' },
                { title: '📚 Decision Trees - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/decision-tree/' }
            ],
            'Pruning': [
                { title: '📚 Pruning Decision Trees - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/ml-pruning-decision-tree/' }
            ]
        },
        'ensemble': {
            'Random Forest': [
                { title: '📚 Random Forest - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/random-forest-algorithm-in-machine-learning/' }
            ],
            'Boosting': [
                { title: '📚 Boosting - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/boosting-in-machine-learning-boosting-and-adaboost/' }
            ],
            'Bagging': [
                { title: '📚 Bagging - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/ml-bagging-classifier/' }
            ]
        },
        'svm': {
            'Linear SVM': [
                { title: '📺 Classification Algorithms - YouTube', url: 'https://youtu.be/z18nw4adsx4?si=QZ9DYY6UmJRcY2Ug' },
                { title: '📚 SVM - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/support-vector-machine-algorithm/' }
            ],
            'Kernel Trick': [
                { title: '📚 Kernel Methods - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/major-kernel-functions-in-support-vector-machine-svm/' }
            ],
            'Margin': [
                { title: '📚 SVM - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/support-vector-machine-algorithm/' }
            ]
        },
        'clustering': {
            'K-Means': [
                { title: '📚 K-Means - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/k-means-clustering-introduction/' }
            ],
            'Hierarchical': [
                { title: '📚 Hierarchical Clustering - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/ml-hierarchical-clustering-agglomerative-and-divisive-clustering/' }
            ],
            'DBSCAN': [
                { title: '📚 DBSCAN - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dbscan-clustering-in-ml-density-based-clustering/' }
            ]
        },
        'neural_networks': {
            'Perceptron': [
                { title: '📺 Neural Networks - YouTube', url: 'https://youtu.be/aircAruvnKk?si=zaGVYYTW-nCuFxs1' },
                { title: '📚 Neural Networks - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-to-artificial-neutral-networks/' }
            ],
            'MLP': [
                { title: '📺 Neural Networks - YouTube', url: 'https://youtu.be/aircAruvnKk?si=zaGVYYTW-nCuFxs1' },
                { title: '📚 Multi-Layer Perceptron - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/multi-layer-perceptron-learning-in-tensorflow/' }
            ],
            'Backpropagation': [
                { title: '📺 Neural Networks - YouTube', url: 'https://youtu.be/aircAruvnKk?si=zaGVYYTW-nCuFxs1' },
                { title: '📚 Backpropagation - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/backpropagation-in-neural-network/' }
            ]
        }
    },

    'ai': {
        'intro': {
            'What is AI': [
                { title: '📺 Introduction to AI - YouTube', url: 'https://youtu.be/XCPZBD9lbVo?si=lcT2KgR9byR2zLl_' },
                { title: '📚 What is AI - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/artificial-intelligence-an-introduction/' }
            ],
            'Agents': [
                { title: '📺 Introduction to AI - YouTube', url: 'https://youtu.be/XCPZBD9lbVo?si=lcT2KgR9byR2zLl_' },
                { title: '📚 AI Agents - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/agents-artificial-intelligence/' }
            ],
            'Environments': [
                { title: '📺 Introduction to AI - YouTube', url: 'https://youtu.be/XCPZBD9lbVo?si=lcT2KgR9byR2zLl_' },
                { title: '📚 Agent Environment - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/environment-in-ai/' }
            ]
        },
        'search': {
            'BFS': [
                { title: '📺 Search Algorithms BFS - YouTube', url: 'https://youtu.be/TWCWuTfOrSo?si=Z6JGO_mIWzzg19hO' },
                { title: '📚 BFS Algorithm - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/' }
            ],
            'DFS': [
                { title: '📺 Search Algorithms DFS - YouTube', url: 'https://youtu.be/yMcZvZayJUA?si=a6TTwOpzopGDWTTW' },
                { title: '📚 DFS Algorithm - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/' }
            ],
            'A*': [
                { title: '📺 A* Algorithm - YouTube', url: 'https://youtu.be/v_No7NEGIKE?si=_9DrCiLbpFyQUwSv' },
                { title: '📚 A* Algorithm - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/a-search-algorithm/' }
            ],
            'Hill Climbing': [
                { title: '📺 Heuristic Search - YouTube', url: 'https://youtu.be/aqdkuGLXlnI?si=MNgZQywDRxg_ddyV' },
                { title: '📚 Hill Climbing - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-hill-climbing-artificial-intelligence/' }
            ]
        },
        'knowledge': {
            'Propositional Logic': [
                { title: '📺 Logic and Reasoning - YouTube', url: 'https://youtu.be/9iN3O_oL2ac?si=FTwbx4WJQ1SSOwUl' },
                { title: '📚 Propositional Logic - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/propositional-logic/' }
            ],
            'First-Order Logic': [
                { title: '📺 Logic and Reasoning - YouTube', url: 'https://youtu.be/9iN3O_oL2ac?si=FTwbx4WJQ1SSOwUl' },
                { title: '📚 First Order Logic - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/first-order-logic-in-artificial-intelligence/' }
            ],
            'Inference': [
                { title: '📺 Logic and Reasoning - YouTube', url: 'https://youtu.be/9iN3O_oL2ac?si=FTwbx4WJQ1SSOwUl' },
                { title: '📚 Inference - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/types-of-reasoning-in-artificial-intelligence/' }
            ]
        },
        'planning': {
            'STRIPS': [
                { title: '📚 Planning in AI - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/planning-in-ai/' }
            ],
            'Partial Order': [
                { title: '📚 Planning in AI - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/planning-in-ai/' }
            ],
            'Graph Planning': [
                { title: '📚 Planning in AI - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/planning-in-ai/' }
            ]
        },
        'ml_basics': {
            'Supervised Learning': [
                { title: '📺 Introduction to ML - YouTube', url: 'https://youtu.be/T3PsRW6wZSY?si=LDSYSi_QN0F-tBxi' },
                { title: '📚 Supervised Learning - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/supervised-unsupervised-learning/' }
            ],
            'Unsupervised Learning': [
                { title: '📺 Introduction to ML - YouTube', url: 'https://youtu.be/T3PsRW6wZSY?si=LDSYSi_QN0F-tBxi' },
                { title: '📚 Unsupervised Learning - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/supervised-unsupervised-learning/' }
            ]
        },
        'expert_systems': {
            'Rule-based Systems': [
                { title: '📚 Expert Systems - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/expert-systems/' }
            ],
            'Inference Engines': [
                { title: '📚 Expert Systems - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/expert-systems/' }
            ]
        },
        'nlp': {
            'Tokenization': [
                { title: '📚 NLP - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/nlp-tutorial/' }
            ],
            'Parsing': [
                { title: '📚 NLP - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/nlp-tutorial/' }
            ],
            'Semantic Analysis': [
                { title: '📚 NLP - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/nlp-tutorial/' }
            ]
        },
        'vision': {
            'Image Processing': [
                { title: '📚 Computer Vision - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/computer-vision/' }
            ],
            'Feature Detection': [
                { title: '📚 Feature Detection - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/feature-detection/' }
            ],
            'Object Recognition': [
                { title: '📚 Object Detection - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/object-detection-vs-object-recognition-vs-image-segmentation/' }
            ]
        }
    },

    'dbms': {
        'intro': {
            'What is DBMS': [
                { title: '📺 Introduction to DBMS - YouTube', url: 'https://youtu.be/OMwgGL3lHlI?si=oVorgNUWLBHW18Hn' },
                { title: '📚 Introduction to DBMS - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system-set-1/' }
            ],
            'Types': [
                { title: '📺 Introduction to DBMS - YouTube', url: 'https://youtu.be/OMwgGL3lHlI?si=oVorgNUWLBHW18Hn' },
                { title: '📚 Types of Databases - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/types-of-databases/' }
            ],
            'ER Model': [
                { title: '📺 Data Models - YouTube', url: 'https://youtu.be/RNl9ZIDzDG0?si=XLQntpkE_ltoM5dN' },
                { title: '📚 ER Model - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-of-er-model/' }
            ]
        },
        'sql_basics': {
            'SELECT': [
                { title: '📺 SQL Basics - YouTube', url: 'https://youtu.be/7S_tz1z_5bA?si=0tZprhB4_deuj197' },
                { title: '📚 SQL Tutorial - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sql-tutorial/' }
            ],
            'INSERT': [
                { title: '📺 SQL Basics - YouTube', url: 'https://youtu.be/7S_tz1z_5bA?si=0tZprhB4_deuj197' },
                { title: '📚 SQL INSERT - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sql-insert-statement/' }
            ],
            'UPDATE': [
                { title: '📺 SQL Basics - YouTube', url: 'https://youtu.be/7S_tz1z_5bA?si=0tZprhB4_deuj197' },
                { title: '📚 SQL UPDATE - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sql-update-statement/' }
            ],
            'DELETE': [
                { title: '📺 SQL Basics - YouTube', url: 'https://youtu.be/7S_tz1z_5bA?si=0tZprhB4_deuj197' },
                { title: '📚 SQL DELETE - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sql-delete-statement/' }
            ]
        },
        'normalization': {
            '1NF': [
                { title: '📺 Normal Forms - YouTube', url: 'https://youtu.be/UrYLYV7WSHM?si=bvcD13_L-hBfvRky' },
                { title: '📚 Normalization - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/normal-forms-in-dbms/' }
            ],
            '2NF': [
                { title: '📺 Normal Forms - YouTube', url: 'https://youtu.be/UrYLYV7WSHM?si=bvcD13_L-hBfvRky' },
                { title: '📚 Second Normal Form - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/second-normal-form-2nf/' }
            ],
            '3NF': [
                { title: '📺 Normal Forms - YouTube', url: 'https://youtu.be/UrYLYV7WSHM?si=bvcD13_L-hBfvRky' },
                { title: '📚 Third Normal Form - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/third-normal-form-3nf/' }
            ],
            'BCNF': [
                { title: '📺 Normal Forms - YouTube', url: 'https://youtu.be/UrYLYV7WSHM?si=bvcD13_L-hBfvRky' },
                { title: '📚 BCNF - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/boyce-codd-normal-form-bcnf/' }
            ]
        },
        'joins': {
            'Inner Join': [
                { title: '📺 Advanced SQL - YouTube', url: 'https://youtu.be/M-55BmjOuXY?si=YfBFim1OEjXmJN4S' },
                { title: '📚 SQL Joins - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/' }
            ],
            'Outer Join': [
                { title: '📺 Advanced SQL - YouTube', url: 'https://youtu.be/M-55BmjOuXY?si=YfBFim1OEjXmJN4S' },
                { title: '📚 Outer Joins - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/' }
            ],
            'Self Join': [
                { title: '📺 Advanced SQL - YouTube', url: 'https://youtu.be/M-55BmjOuXY?si=YfBFim1OEjXmJN4S' },
                { title: '📚 Self Join - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sql-self-join/' }
            ]
        },
        'transactions': {
            'ACID Properties': [
                { title: '📺 ACID Properties - YouTube', url: 'https://youtu.be/-GS0OxFJsYQ?si=9ug9xLlReLN-1P_w' },
                { title: '📚 ACID Properties - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/' }
            ],
            'Commit': [
                { title: '📺 ACID Properties - YouTube', url: 'https://youtu.be/-GS0OxFJsYQ?si=9ug9xLlReLN-1P_w' },
                { title: '📚 Transactions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/transaction-in-dbms/' }
            ],
            'Rollback': [
                { title: '📺 ACID Properties - YouTube', url: 'https://youtu.be/-GS0OxFJsYQ?si=9ug9xLlReLN-1P_w' },
                { title: '📚 Transactions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/transaction-in-dbms/' }
            ]
        },
        'indexing': {
            'B-Tree': [
                { title: '📚 Indexing - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/indexing-in-databases-set-1/' }
            ],
            'B+ Tree': [
                { title: '📚 B+ Tree - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-of-b-tree/' }
            ],
            'Hashing': [
                { title: '📚 Hashing - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/hashing-in-dbms/' }
            ]
        },
        'concurrency': {
            'Locks': [
                { title: '📚 Concurrency Control - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/concurrency-control-in-dbms/' }
            ],
            'Deadlock': [
                { title: '📚 Deadlock - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/deadlock-in-dbms/' }
            ],
            '2PL': [
                { title: '📚 Two Phase Locking - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/two-phase-locking-protocol/' }
            ]
        },
        'recovery': {
            'Log-based': [
                { title: '📚 Log Based Recovery - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/log-based-recovery-in-dbms/' }
            ],
            'Checkpoints': [
                { title: '📚 Checkpoints - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/checkpoint-in-dbms/' }
            ],
            'ARIES': [
                { title: '📚 Recovery System - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/recovery-system-in-dbms/' }
            ]
        }
    },

    'java': {
        'basics': {
            'Syntax': [
                { title: '📺 Introduction to Java - YouTube', url: 'https://youtu.be/mG4NLNZ37y4?si=lon9mMTdAt88ORU_' },
                { title: '📚 Introduction to Java - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-to-java/' }
            ],
            'Variables': [
                { title: '📺 Data Types and Variables - YouTube', url: 'https://youtu.be/N8LDSryePuc?si=AcMwOOoG5rNtUGCE' },
                { title: '📚 Java Variables - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/variables-in-java/' }
            ],
            'Data Types': [
                { title: '📺 Data Types and Variables - YouTube', url: 'https://youtu.be/N8LDSryePuc?si=AcMwOOoG5rNtUGCE' },
                { title: '📚 Java Data Types - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-types-in-java/' }
            ],
            'Operators': [
                { title: '📚 Java Operators - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/operators-in-java/' }
            ]
        },
        'control': {
            'If-Else': [
                { title: '📚 Java Control Statements - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/decision-making-javaif-else-switch-break-continue-jump/' }
            ],
            'Switch': [
                { title: '📚 Switch Statement - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/switch-statement-in-java/' }
            ],
            'Loops': [
                { title: '📚 Java Loops - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/loops-in-java/' }
            ]
        },
        'oop': {
            'Classes': [
                { title: '📺 Classes and Objects - YouTube', url: 'https://youtu.be/W-D71ZeMixQ?si=ypbxmchbjubuoFc6' },
                { title: '📚 Classes and Objects - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/classes-objects-java/' }
            ],
            'Objects': [
                { title: '📺 Classes and Objects - YouTube', url: 'https://youtu.be/W-D71ZeMixQ?si=ypbxmchbjubuoFc6' },
                { title: '📚 Classes and Objects - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/classes-objects-java/' }
            ],
            'Inheritance': [
                { title: '📺 Inheritance - YouTube', url: 'https://youtu.be/nixQyPIAnOQ?si=80ZErhUVUqXZBCwI' },
                { title: '📚 Inheritance - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/inheritance-in-java/' }
            ],
            'Polymorphism': [
                { title: '📚 Polymorphism - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/polymorphism-in-java/' }
            ]
        },
        'arrays': {
            'ArrayList': [
                { title: '📚 ArrayList - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/arraylist-in-java/' }
            ],
            'HashMap': [
                { title: '📚 HashMap - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java-util-hashmap-in-java-with-examples/' }
            ],
            'Sets': [
                { title: '📚 Sets in Java - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/set-in-java/' }
            ]
        },
        'exceptions': {
            'Try-Catch': [
                { title: '📺 Exception Handling - YouTube', url: 'https://youtu.be/1XAfapkBQjk?si=CC57TTjys_tkTHiC' },
                { title: '📚 Exception Handling - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/exceptions-in-java/' }
            ],
            'Throws': [
                { title: '📺 Exception Handling - YouTube', url: 'https://youtu.be/1XAfapkBQjk?si=CC57TTjys_tkTHiC' },
                { title: '📚 Throw vs Throws - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/throw-throws-java/' }
            ],
            'Custom Exceptions': [
                { title: '📺 Exception Handling - YouTube', url: 'https://youtu.be/1XAfapkBQjk?si=CC57TTjys_tkTHiC' },
                { title: '📚 Custom Exceptions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/user-defined-custom-exception-in-java/' }
            ]
        },
        'multithreading': {
            'Threads': [
                { title: '📚 Java Multithreading - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/multithreading-in-java/' }
            ],
            'Synchronization': [
                { title: '📚 Synchronization - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/synchronization-in-java/' }
            ],
            'Concurrency': [
                { title: '📚 Concurrency - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/concurrency-in-java/' }
            ]
        },
        'file_io': {
            'File Class': [
                { title: '📚 File Handling - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/file-handling-in-java/' }
            ],
            'Streams': [
                { title: '📚 Java Streams - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java-8-stream/' }
            ],
            'Serialization': [
                { title: '📚 Serialization - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/serialization-in-java/' }
            ]
        },
        'jdbc': {
            'Database Connection': [
                { title: '📚 JDBC - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-to-jdbc/' }
            ],
            'PreparedStatement': [
                { title: '📚 PreparedStatement - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/jdbc-preparedstatement-class/' }
            ],
            'ResultSet': [
                { title: '📚 ResultSet - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/performing-database-operations-java-sql-create-insert-update-delete-select/' }
            ]
        }
    },

    'data_science': {
        'intro': {
            'What is Data Science': [
                { title: '📚 Data Science Tutorial - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-science-tutorial/' }
            ],
            'Data Types': [
                { title: '📚 Data Types - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/understanding-data-types-in-statistics/' }
            ],
            'Statistics': [
                { title: '📚 Statistics Tutorial - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/statistics-tutorial/' }
            ]
        },
        'python_basics': {
            'NumPy': [
                { title: '📺 Data Preprocessing - YouTube', url: 'https://youtu.be/EQlbKwvmXg4?si=IF7gMNj29wlBvaYG' },
                { title: '📚 NumPy - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/numpy-tutorial/' }
            ],
            'Pandas': [
                { title: '📺 Data Preprocessing - YouTube', url: 'https://youtu.be/EQlbKwvmXg4?si=IF7gMNj29wlBvaYG' },
                { title: '📚 Pandas - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/pandas-tutorial/' }
            ],
            'Matplotlib': [
                { title: '📚 Matplotlib - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/matplotlib-tutorial/' }
            ]
        },
        'eda': {
            'Data Cleaning': [
                { title: '📺 Data Preprocessing - YouTube', url: 'https://youtu.be/EQlbKwvmXg4?si=IF7gMNj29wlBvaYG' },
                { title: '📚 Data Preprocessing - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-preprocessing-machine-learning-python/' }
            ],
            'Visualization': [
                { title: '📚 Data Visualization - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-data-visualization-tutorial/' }
            ],
            'Summary Statistics': [
                { title: '📚 Descriptive Statistics - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-statistics-mean-function/' }
            ]
        },
        'statistics': {
            'Descriptive Stats': [
                { title: '📚 Statistics Tutorial - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/statistics-tutorial/' }
            ],
            'Inferential Stats': [
                { title: '📚 Inferential Statistics - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/what-is-inferential-statistics/' }
            ],
            'Hypothesis Testing': [
                { title: '📚 Hypothesis Testing - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/understanding-hypothesis-testing/' }
            ]
        },
        'ml_basics': {
            'Regression': [
                { title: '📺 Regression Algorithms - YouTube', url: 'https://youtu.be/xLdvMG5qAmo?si=GJAgoBVk9eDCmjr3' },
                { title: '📚 Regression - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/ml-linear-regression/' }
            ],
            'Classification': [
                { title: '📺 Classification Algorithms - YouTube', url: 'https://youtu.be/z18nw4adsx4?si=QZ9DYY6UmJRcY2Ug' },
                { title: '📚 Classification - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/getting-started-with-classification/' }
            ],
            'Model Evaluation': [
                { title: '📺 Evaluation Metrics - YouTube', url: 'https://youtu.be/lt1YxJ_8Jzs?si=bRqnd_caqaxT3Wkz' },
                { title: '📚 Evaluation Metrics - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/metrics-for-machine-learning-model/' }
            ]
        },
        'feature_eng': {
            'Feature Selection': [
                { title: '📚 Feature Engineering - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/what-is-feature-engineering/' }
            ],
            'Feature Extraction': [
                { title: '📚 Feature Engineering - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/what-is-feature-engineering/' }
            ],
            'Encoding': [
                { title: '📚 Label Encoding - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/ml-label-encoding-of-datasets-in-python/' }
            ]
        },
        'deep_learning': {
            'Neural Networks': [
                { title: '📺 Neural Networks - YouTube', url: 'https://youtu.be/aircAruvnKk?si=zaGVYYTW-nCuFxs1' },
                { title: '📚 Neural Networks - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-to-artificial-neutral-networks/' }
            ],
            'CNN': [
                { title: '📚 CNN - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-convolution-neural-network/' }
            ],
            'RNN': [
                { title: '📚 RNN - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/introduction-to-recurrent-neural-network/' }
            ]
        },
        'deployment': {
            'Flask': [
                { title: '📚 Flask Tutorial - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/flask-tutorial/' }
            ],
            'API': [
                { title: '📚 Creating API - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-build-a-rest-api-using-flask/' }
            ],
            'Cloud Deployment': [
                { title: '📚 Model Deployment - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/deploying-machine-learning-models/' }
            ]
        }
    }
};

// ===== CRITICAL MAPPING FUNCTION =====
// This maps the actual subject IDs used in your app to the reference link keys

function normalizeSubjectId(subjectId) {
    const mapping = {
        'Python Programming': 'python',
        'python': 'python',
        'C Programming': 'c',
        'c': 'c',
        'DAA': 'daa',
        'daa': 'daa',
        'Design and Analysis of Algorithms': 'daa',
        'Machine Learning': 'ml',
        'ml': 'ml',
        'Java Programming': 'java',
        'java': 'java',
        'DBMS': 'dbms',
        'dbms': 'dbms',
        'Database Management Systems': 'dbms',
        'Artificial Intelligence': 'ai',
        'ai': 'ai',
        'AI': 'ai',
        'Data Science': 'data_science',
        'data_science': 'data_science'
    };
    
    return mapping[subjectId] || subjectId.toLowerCase();
}

// Function to get reference links for a subtopic
function getReferenceLinks(subject, topic, subtopic) {
    try {
        // Normalize subject ID
        const normalizedSubject = normalizeSubjectId(subject);
        
        console.log('🔍 getReferenceLinks called:');
        console.log('  Original subject:', subject);
        console.log('  Normalized subject:', normalizedSubject);
        console.log('  Topic:', topic);
        console.log('  Subtopic:', subtopic);
        
        const subjectLinks = REFERENCE_LINKS[normalizedSubject];
        if (!subjectLinks) {
            console.warn(`⚠️ No reference links found for subject: ${normalizedSubject}`);
            return getDefaultLinks(normalizedSubject);
        }
        
        const topicLinks = subjectLinks[topic];
        if (!topicLinks) {
            console.warn(`⚠️ No reference links found for topic: ${topic} in subject: ${normalizedSubject}`);
            return getDefaultLinks(normalizedSubject);
        }
        
        const subtopicLinks = topicLinks[subtopic];
        if (!subtopicLinks || subtopicLinks.length === 0) {
            console.warn(`⚠️ No reference links found for subtopic: ${subtopic} in topic: ${topic}`);
            // Try to get any links from the topic
            const anyTopicLinks = Object.values(topicLinks)[0];
            if (anyTopicLinks && anyTopicLinks.length > 0) {
                console.log('✅ Using first available topic links as fallback');
                return anyTopicLinks;
            }
            return getDefaultLinks(normalizedSubject);
        }
        
        console.log('✅ Found', subtopicLinks.length, 'links for', subtopic);
        return subtopicLinks;
    } catch (error) {
        console.error('❌ Error getting reference links:', error);
        return getDefaultLinks(subject);
    }
}

// Default links when specific links are not available
function getDefaultLinks(subject) {
    const normalizedSubject = normalizeSubjectId(subject);
    const searchTerm = normalizedSubject.replace(/_/g, ' ');
    
    return [
        { 
            title: '📚 Search on GeeksforGeeks', 
            url: `https://www.geeksforgeeks.org/${normalizedSubject}-tutorial/` 
        },
        { 
            title: '📺 Search on YouTube', 
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm + ' tutorial')}` 
        }
    ];
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { REFERENCE_LINKS, getReferenceLinks, normalizeSubjectId };
}