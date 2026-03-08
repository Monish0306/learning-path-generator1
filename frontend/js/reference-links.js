// ==================== REFERENCE LINKS DATABASE ====================
// PERFECT VERSION - Maps EXACTLY to backend topic/subtopic IDs

const REFERENCE_LINKS = {
    // ========== PYTHON ==========
    'python': {
        // ALL PYTHON LINKS - Using flexible matching
        'Variables and Data Types': [
            { title: '📺 Variables and Data Types Part 1 - YouTube', url: 'https://youtu.be/a43BIxiZ5EM?si=MIchtKCR0jIGxJ2O' },
            { title: '📺 Variables and Data Types Part 2 - YouTube', url: 'https://youtu.be/TTepNRy0wj8?si=xlUGwuxzNNyrWmMK' },
            { title: '📚 Python Variables - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-variables/' },
            { title: '📚 Python Data Types - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-data-types/' }
        ],
        'Variables': [
            { title: '📺 Variables and Data Types Part 1 - YouTube', url: 'https://youtu.be/a43BIxiZ5EM?si=MIchtKCR0jIGxJ2O' },
            { title: '📺 Variables and Data Types Part 2 - YouTube', url: 'https://youtu.be/TTepNRy0wj8?si=xlUGwuxzNNyrWmMK' },
            { title: '📚 Python Variables - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-variables/' }
        ],
        'Data Types': [
            { title: '📺 Variables and Data Types - YouTube', url: 'https://youtu.be/a43BIxiZ5EM?si=MIchtKCR0jIGxJ2O' },
            { title: '📚 Python Data Types - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-data-types/' }
        ],
        'Control Flow': [
            { title: '📺 Control Flow - YouTube', url: 'https://youtu.be/S73thl0AyFU?si=7VMomcXhnSBwWViZ' },
            { title: '📚 Control Flow - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/computer-science-fundamentals/control-flow-statements-in-programming/' }
        ],
        'If-Else': [
            { title: '📺 Control Flow - YouTube', url: 'https://youtu.be/S73thl0AyFU?si=7VMomcXhnSBwWViZ' },
            { title: '📚 Control Flow - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/computer-science-fundamentals/control-flow-statements-in-programming/' }
        ],
        'Loops': [
            { title: '📺 Control Flow - YouTube', url: 'https://youtu.be/S73thl0AyFU?si=7VMomcXhnSBwWViZ' },
            { title: '📚 Control Flow - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/computer-science-fundamentals/control-flow-statements-in-programming/' }
        ],
        'Lists and Collections': [
            { title: '📺 Lists and Collections - YouTube', url: 'https://youtu.be/W8KRzm-HUcc?si=wU1ZBre4mU00IY1k' },
            { title: '📺 Lists Operations - YouTube', url: 'https://youtu.be/NejbU3CVQdg?si=ksNo7Y7ZJJpF7aXj' },
            { title: '📚 Python Lists - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-lists/' },
            { title: '📚 Python Collections - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-collections-module/' }
        ],
        'Lists': [
            { title: '📺 Lists and Collections - YouTube', url: 'https://youtu.be/W8KRzm-HUcc?si=wU1ZBre4mU00IY1k' },
            { title: '📺 Lists Operations - YouTube', url: 'https://youtu.be/NejbU3CVQdg?si=ksNo7Y7ZJJpF7aXj' },
            { title: '📚 Python Lists - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-lists/' }
        ],
        'Function Basics': [
            { title: '📺 Function Basics - YouTube', url: 'https://youtu.be/u-OmVr_fT4s?si=kWcuuNKC4yO5jfsL' },
            { title: '📚 Python Functions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-functions/' }
        ],
        'Functions': [
            { title: '📺 Function Basics - YouTube', url: 'https://youtu.be/u-OmVr_fT4s?si=kWcuuNKC4yO5jfsL' },
            { title: '📚 Python Functions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-functions/' }
        ],
        'Lambda Functions': [
            { title: '📺 Lambda Functions - YouTube', url: 'https://youtu.be/P8MdDCTbMOI?si=rLLV2B2qhuP_NChZ' },
            { title: '📚 Python Lambda - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-lambda-anonymous-functions-filter-map-reduce/' }
        ],
        'Lambda': [
            { title: '📺 Lambda Functions - YouTube', url: 'https://youtu.be/P8MdDCTbMOI?si=rLLV2B2qhuP_NChZ' },
            { title: '📚 Python Lambda - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-lambda-anonymous-functions-filter-map-reduce/' }
        ],
        'Dictionaries and Sets': [
            { title: '📺 Dictionaries and Sets - YouTube', url: 'https://youtu.be/078tYSD7K8E?si=tojv3OfC5qwTHRQ4' },
            { title: '📚 Python Dictionaries - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-dictionary/' },
            { title: '📚 Python Sets - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/sets-in-python/' }
        ],
        'Dictionaries': [
            { title: '📺 Dictionaries and Sets - YouTube', url: 'https://youtu.be/078tYSD7K8E?si=tojv3OfC5qwTHRQ4' },
            { title: '📚 Python Dictionaries - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-dictionary/' }
        ],
        'Sets': [
            { title: '📺 Dictionaries and Sets - YouTube', url: 'https://youtu.be/078tYSD7K8E?si=tojv3OfC5qwTHRQ4' },
            { title: '📚 Python Sets - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/sets-in-python/' }
        ],
        'Tuple': [
            { title: '📺 Tuples - YouTube', url: 'https://youtu.be/zLFituJxj6c?si=jYCyNcJRBHB0eUnp' },
            { title: '📚 Python Tuples - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-tuples/' }
        ],
        'Tuples': [
            { title: '📺 Tuples - YouTube', url: 'https://youtu.be/zLFituJxj6c?si=jYCyNcJRBHB0eUnp' },
            { title: '📚 Python Tuples - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-tuples/' }
        ],
        'File Operations': [
            { title: '📺 File Operations - YouTube', url: 'https://youtu.be/Sx1Hjr67xO0?si=uND3MftRFVWz8CxF' },
            { title: '📚 File Handling - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/file-handling-python/' }
        ],
        'Exception Handling': [
            { title: '📺 Exception Handling - YouTube', url: 'https://youtu.be/6SPDvPK38tw?si=JRQO5CTJQNJLaV9k' },
            { title: '📚 Exception Handling - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-exception-handling/' }
        ],
        'Classes and Objects': [
            { title: '📺 Classes and Objects - YouTube', url: 'https://youtu.be/Gvm2Sg1rZek?si=0lYrFq9TaJWL8OGf' },
            { title: '📚 Classes and Objects - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-classes-and-objects/' }
        ],
        'Classes': [
            { title: '📺 Classes and Objects - YouTube', url: 'https://youtu.be/Gvm2Sg1rZek?si=0lYrFq9TaJWL8OGf' },
            { title: '📚 Classes and Objects - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-classes-and-objects/' }
        ],
        'Objects': [
            { title: '📺 Classes and Objects - YouTube', url: 'https://youtu.be/Gvm2Sg1rZek?si=0lYrFq9TaJWL8OGf' },
            { title: '📚 Classes and Objects - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python/python-classes-and-objects/' }
        ]
    },

    // ========== DAA ==========
    'daa': {
        'Time and Space Complexity': [
            { title: '📺 Time and Space Complexity - YouTube', url: 'https://youtu.be/9TlHvipP5yA?si=LEZsxdjSkNYso0Wp' },
            { title: '📚 Time Complexity - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dsa/time-complexity-and-space-complexity/' }
        ],
        'Complexity': [
            { title: '📺 Time and Space Complexity - YouTube', url: 'https://youtu.be/9TlHvipP5yA?si=LEZsxdjSkNYso0Wp' },
            { title: '📚 Time Complexity - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dsa/time-complexity-and-space-complexity/' }
        ],
        'Asymptotic Notations': [
            { title: '📺 Asymptotic Notations - YouTube', url: 'https://youtu.be/A03oI0znAoc?si=hoe2YasvtpXHYjpg' },
            { title: '📚 Asymptotic Notations - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dsa/types-of-asymptotic-notations-in-complexity-analysis-of-algorithms/' }
        ],
        'Big-O Notation': [
            { title: '📺 Asymptotic Notations - YouTube', url: 'https://youtu.be/A03oI0znAoc?si=hoe2YasvtpXHYjpg' },
            { title: '📚 Asymptotic Notations - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dsa/types-of-asymptotic-notations-in-complexity-analysis-of-algorithms/' }
        ],
        'Basic Sorting': [
            { title: '📺 Basic Sorting - YouTube', url: 'https://youtu.be/1jCFUv-Xlqo?si=DWBzAG9WdwjcC8DO' },
            { title: '📚 Sorting Algorithms - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dsa/sorting-algorithms/' }
        ],
        'Bubble Sort': [
            { title: '📺 Basic Sorting - YouTube', url: 'https://youtu.be/1jCFUv-Xlqo?si=DWBzAG9WdwjcC8DO' },
            { title: '📚 Bubble Sort - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/bubble-sort/' }
        ],
        'Advanced Sorting': [
            { title: '📺 Advanced Sorting - YouTube', url: 'https://youtu.be/9crZRd8GPWM?si=dYm5cpXPn-HdHvzT' },
            { title: '📚 Sorting Algorithms - GeeksforGeeks', url: 'https://www.scribd.com/document/716437655/Sorting-II-Part-I-No-Code' }
        ],
        'Quick Sort': [
            { title: '📺 Advanced Sorting - YouTube', url: 'https://youtu.be/9crZRd8GPWM?si=dYm5cpXPn-HdHvzT' },
            { title: '📚 Quick Sort - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/quick-sort/' }
        ],
        'Merge Sort': [
            { title: '📺 Advanced Sorting - YouTube', url: 'https://youtu.be/9crZRd8GPWM?si=dYm5cpXPn-HdHvzT' },
            { title: '📚 Merge Sort - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/merge-sort/' }
        ],
        'Graph Traversal': [
            { title: '📺 Graph Traversal - YouTube', url: 'https://youtu.be/vf-cxgUXcMk?si=TKYBLRv3cTJ9YXkv' },
            { title: '📚 Graph Algorithms - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dsa/graph-data-structure-and-algorithms/' }
        ],
        'BFS': [
            { title: '📺 Graph Traversal - YouTube', url: 'https://youtu.be/vf-cxgUXcMk?si=TKYBLRv3cTJ9YXkv' },
            { title: '📚 BFS - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/' }
        ],
        'DFS': [
            { title: '📺 Graph Traversal - YouTube', url: 'https://youtu.be/vf-cxgUXcMk?si=TKYBLRv3cTJ9YXkv' },
            { title: '📚 DFS - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/' }
        ],
        'DP Fundamentals': [
            { title: '📺 DP Fundamentals - YouTube', url: 'https://youtu.be/5dRGRueKU3M?si=sW32Sxehpe1LemZt' },
            { title: '📚 Dynamic Programming - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/competitive-programming/dynamic-programming/' }
        ],
        'Dynamic Programming': [
            { title: '📺 DP Fundamentals - YouTube', url: 'https://youtu.be/5dRGRueKU3M?si=sW32Sxehpe1LemZt' },
            { title: '📚 Dynamic Programming - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/competitive-programming/dynamic-programming/' }
        ]
    },

    // ========== ML ==========
    'ml': {
        'Introduction to ML': [
            { title: '📺 Introduction to ML - YouTube', url: 'https://youtu.be/T3PsRW6wZSY?si=LDSYSi_QN0F-tBxi' },
            { title: '📚 Introduction to ML - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/machine-learning/introduction-machine-learning/' }
        ],
        'Data Preprocessing': [
            { title: '📺 Data Preprocessing - YouTube', url: 'https://youtu.be/EQlbKwvmXg4?si=IF7gMNj29wlBvaYG' },
            { title: '📚 Data Preprocessing - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-analysis/data-preprocessing-machine-learning-python/' }
        ],
        'Classification Algorithms': [
            { title: '📺 Classification Algorithms - YouTube', url: 'https://youtu.be/z18nw4adsx4?si=QZ9DYY6UmJRcY2Ug' },
            { title: '📚 Classification - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/machine-learning/top-machine-learning-algorithms-for-classification/' }
        ],
        'Regression Algorithms': [
            { title: '📺 Regression Algorithms - YouTube', url: 'https://youtu.be/xLdvMG5qAmo?si=GJAgoBVk9eDCmjr3' },
            { title: '📚 Regression - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/machine-learning/regression-in-machine-learning/' }
        ],
        'Evaluation Metrics': [
            { title: '📺 Evaluation Metrics - YouTube', url: 'https://youtu.be/lt1YxJ_8Jzs?si=bRqnd_caqaxT3Wkz' },
            { title: '📚 Evaluation Metrics - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/machine-learning/metrics-for-machine-learning-model/' }
        ]
    },

    // ========== AI ==========
    'ai': {
        'Introduction to AI': [
            { title: '📺 Introduction to AI - YouTube', url: 'https://youtu.be/XCPZBD9lbVo?si=lcT2KgR9byR2zLl_' },
            { title: '📚 What is AI - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/artificial-intelligence/what-is-artificial-intelligence-ai/' }
        ],
        'Search Algorithms': [
            { title: '📺 BFS - YouTube', url: 'https://youtu.be/TWCWuTfOrSo?si=Z6JGO_mIWzzg19hO' },
            { title: '📺 DFS - YouTube', url: 'https://youtu.be/yMcZvZayJUA?si=a6TTwOpzopGDWTTW' },
            { title: '📺 A* Algorithm - YouTube', url: 'https://youtu.be/v_No7NEGIKE?si=_9DrCiLbpFyQUwSv' },
            { title: '📺 Hill Climbing - YouTube', url: 'https://youtu.be/aqdkuGLXlnI?si=MNgZQywDRxg_ddyV' },
            { title: '📚 Search Algorithms - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/machine-learning/search-algorithms-in-ai/' }
        ],
        'Logic and Reasoning': [
            { title: '📺 Logic and Reasoning - YouTube', url: 'https://youtu.be/9iN3O_oL2ac?si=FTwbx4WJQ1SSOwUl' },
            { title: '📚 Logic and Reasoning - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/artificial-intelligence/types-of-reasoning-in-artificial-intelligence/' }
        ],
        'Neural Networks': [
            { title: '📺 Neural Networks - YouTube', url: 'https://youtu.be/aircAruvnKk?si=zaGVYYTW-nCuFxs1' },
            { title: '📚 Neural Networks - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/deep-learning/introduction-to-artificial-neutral-networks/' }
        ]
    },

    // ========== DBMS ==========
    'dbms': {
        'Introduction to DBMS': [
            { title: '📺 Introduction to DBMS - YouTube', url: 'https://youtu.be/OMwgGL3lHlI?si=oVorgNUWLBHW18Hn' },
            { title: '📚 Introduction to DBMS - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dbms/introduction-of-dbms-database-management-system-set-1/' }
        ],
        'Data Models': [
            { title: '📺 Data Models - YouTube', url: 'https://youtu.be/RNl9ZIDzDG0?si=XLQntpkE_ltoM5dN' },
            { title: '📚 Data Models - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dbms/data-models-in-dbms/' }
        ],
        'SQL Basics': [
            { title: '📺 SQL Basics - YouTube', url: 'https://youtu.be/7S_tz1z_5bA?si=0tZprhB4_deuj197' },
            { title: '📚 SQL Tutorial - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sql/sql-tutorial/' }
        ],
        'Advanced SQL': [
            { title: '📺 Advanced SQL - YouTube', url: 'https://youtu.be/M-55BmjOuXY?si=YfBFim1OEjXmJN4S' },
            { title: '📚 Advanced SQL - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sql/sql-advanced-functions/' }
        ],
        'Normal Forms': [
            { title: '📺 Normal Forms - YouTube', url: 'https://youtu.be/UrYLYV7WSHM?si=bvcD13_L-hBfvRky' },
            { title: '📚 Normal Forms - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/' }
        ],
        'Normalization': [
            { title: '📺 Normal Forms - YouTube', url: 'https://youtu.be/UrYLYV7WSHM?si=bvcD13_L-hBfvRky' },
            { title: '📚 Normal Forms - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/' }
        ],
        'ACID Properties': [
            { title: '📺 ACID Properties - YouTube', url: 'https://youtu.be/-GS0OxFJsYQ?si=9ug9xLlReLN-1P_w' },
            { title: '📚 ACID Properties - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dbms/acid-properties-in-dbms/' }
        ]
    },

    // ========== JAVA ==========
    'java': {
        'Introduction to Java': [
            { title: '📺 Introduction to Java - YouTube', url: 'https://youtu.be/mG4NLNZ37y4?si=lon9mMTdAt88ORU_' },
            { title: '📚 Introduction to Java - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java/introduction-to-java/' }
        ],
        'Data Types and Variables': [
            { title: '📺 Data Types and Variables - YouTube', url: 'https://youtu.be/N8LDSryePuc?si=AcMwOOoG5rNtUGCE' },
            { title: '📚 Java Data Types - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java/java-data-types/' },
            { title: '📚 Java Variables - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java/variables-in-java/' }
        ],
        'Data Types': [
            { title: '📺 Data Types and Variables - YouTube', url: 'https://youtu.be/N8LDSryePuc?si=AcMwOOoG5rNtUGCE' },
            { title: '📚 Java Data Types - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java/java-data-types/' }
        ],
        'Variables': [
            { title: '📺 Data Types and Variables - YouTube', url: 'https://youtu.be/N8LDSryePuc?si=AcMwOOoG5rNtUGCE' },
            { title: '📚 Java Variables - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java/variables-in-java/' }
        ],
        'Classes and Objects': [
            { title: '📺 Classes and Objects - YouTube', url: 'https://youtu.be/W-D71ZeMixQ?si=ypbxmchbjubuoFc6' },
            { title: '📚 Classes and Objects - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java/classes-objects-java/' }
        ],
        'Inheritance': [
            { title: '📺 Inheritance - YouTube', url: 'https://youtu.be/nixQyPIAnOQ?si=80ZErhUVUqXZBCwI' },
            { title: '📚 Inheritance - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java/inheritance-in-java/' }
        ],
        'Exception Handling': [
            { title: '📺 Exception Handling - YouTube', url: 'https://youtu.be/1XAfapkBQjk?si=CC57TTjys_tkTHiC' },
            { title: '📚 Exception Handling - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/java/exceptions-in-java/' }
        ]
    },

    // ========== C ==========
    'c': {
        'Introduction to C': [
            { title: '📺 Introduction to C - YouTube', url: 'https://youtu.be/EjavYOFoJJ0?si=1xlDmX5u2FuImdJe' },
            { title: '📚 C Language Introduction - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/c-language-introduction/' }
        ],
        'Data Types and Operators': [
            { title: '📺 Data Types - YouTube', url: 'https://youtu.be/NyT9vvSBoeo?si=qBzP3VZL84KEwlTx' },
            { title: '📺 Operators - YouTube', url: 'https://youtu.be/E1_Gg6dURwk?si=3ti_yi2ZIZNf1wwl' },
            { title: '📚 Data Types in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/data-types-in-c/' },
            { title: '📚 Operators in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/operators-in-c/' }
        ],
        'Data Types': [
            { title: '📺 Data Types - YouTube', url: 'https://youtu.be/NyT9vvSBoeo?si=qBzP3VZL84KEwlTx' },
            { title: '📚 Data Types in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/data-types-in-c/' }
        ],
        'Operators': [
            { title: '📺 Operators - YouTube', url: 'https://youtu.be/E1_Gg6dURwk?si=3ti_yi2ZIZNf1wwl' },
            { title: '📚 Operators in C - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/operators-in-c/' }
        ],
        'Loops': [
            { title: '📺 For Loop - YouTube', url: 'https://youtu.be/agl3vjzbG2o?si=B2rPBBdn3mZVYUTu' },
            { title: '📺 While Loop - YouTube', url: 'https://youtu.be/IGuoF98qEG0?si=CGi4oFCxXmCufUUF' },
            { title: '📺 Do-While Loop - YouTube', url: 'https://youtu.be/nohmBtIby_k?si=uTTr7buJzyT9acaQ' },
            { title: '📺 Break - YouTube', url: 'https://youtu.be/PLgJsMEPKec?si=vpMNVqRTe_sMHSNf' },
            { title: '📺 Continue - YouTube', url: 'https://youtu.be/6mTxoCb1m94?si=Kirjs3jgk564oNRS' },
            { title: '📚 C Loops - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/c-loops/' }
        ],
        'Conditional Statements': [
            { title: '📺 If - YouTube', url: 'https://youtu.be/oYuRtXcwXqw?si=xuQq3VdC-37-sQmi' },
            { title: '📺 If-Else - YouTube', url: 'https://youtu.be/oWTnLzWkF5w?si=2hu3dIcAcZZgYzrK' },
            { title: '📺 Nested - YouTube', url: 'https://youtu.be/ySIWMLJI7HI?si=U84DNbW6YSvOHN9c' },
            { title: '📺 Else-If - YouTube', url: 'https://youtu.be/sRCtrviXnLs?si=Q59xV_Yw-kaYN5Tx' },
            { title: '📺 Switch - YouTube', url: 'https://youtu.be/BHS4iA7bsDk?si=HWPJYS6yVmRHQbE1' },
            { title: '📚 Decision Making - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/decision-making-in-c/' }
        ],
        'If-Else': [
            { title: '📺 If-Else - YouTube', url: 'https://youtu.be/oWTnLzWkF5w?si=2hu3dIcAcZZgYzrK' },
            { title: '📚 Decision Making - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/decision-making-in-c/' }
        ],
        'Switch': [
            { title: '📺 Switch - YouTube', url: 'https://youtu.be/BHS4iA7bsDk?si=HWPJYS6yVmRHQbE1' },
            { title: '📚 Decision Making - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/decision-making-in-c/' }
        ],
        'Function Fundamentals': [
            { title: '📺 Function Fundamentals - YouTube', url: 'https://youtu.be/f--fD8Y0RnA?si=HG626qDvmau1tB97' },
            { title: '📚 C Functions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/c-functions/' }
        ],
        'Functions': [
            { title: '📺 Function Fundamentals - YouTube', url: 'https://youtu.be/f--fD8Y0RnA?si=HG626qDvmau1tB97' },
            { title: '📚 C Functions - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/c-functions/' }
        ],
        'Pointers': [
            { title: '📺 Pointers Intro - YouTube', url: 'https://youtu.be/IuDJeGqEZ3A?si=pwwtxjKWYLw0juY8' },
            { title: '📺 Single Pointer - YouTube', url: 'https://youtu.be/qqRUp28pPFk?si=7Jm-5E7UwMEMFZQG' },
            { title: '📺 Double Pointers - YouTube', url: 'https://youtu.be/TPNYntM-5o4?si=LW6XMTmeXJZE4hcF' },
            { title: '📚 C Pointers - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/c-pointers/' }
        ],
        'Arrays': [
            { title: '📺 1D Arrays - YouTube', url: 'https://youtu.be/08LWytp6PNI?si=4ZuTC-KP0-mlzEO4' },
            { title: '📺 2D Arrays - YouTube', url: 'https://youtu.be/HMBYWhpP8i4?si=4B0xBHmpWSY0RkFz' },
            { title: '📚 C Arrays - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/c/c-arrays/' }
        ]
    },

    // ========== C++ ==========
    'cpp': {
        'Introduction to C++': [
            { title: '📺 Introduction to C++ - YouTube', url: 'https://youtu.be/s0g4ty29Xgg?si=kkDM-o-XhjMW6--6' },
            { title: '📚 C++ - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/cpp/c-plus-plus/' }
        ],
        'Data Types and Operators': [
            { title: '📺 Data Types - YouTube', url: 'https://youtu.be/zgutFVxOlTY?si=gvpfRKHi5MzCkKzC' },
            { title: '📺 Operators - YouTube', url: 'https://youtu.be/dh3v5e2g67I?si=mI9bvi0iyJJWqdEP' },
            { title: '📚 Data Types - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/cpp/cpp-data-types/' },
            { title: '📚 Operators - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/cpp/operators-in-cpp/' }
        ],
        'Classes and Objects': [
            { title: '📺 Classes and Objects - YouTube', url: 'https://youtu.be/x8T0eSPeydA?si=wJzPZGvEavAVHcq0' },
            { title: '📚 Classes and Objects - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/cpp/c-classes-and-objects/' }
        ],
        'Inheritance and Polymorphism': [
            { title: '📺 Inheritance and Polymorphism - YouTube', url: 'https://youtu.be/46T2wD3IuhM?si=SuPeTYdSD6kwoViW' },
            { title: '📚 Inheritance - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/cpp/inheritance-in-c/' },
            { title: '📚 Polymorphism - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/cpp/cpp-polymorphism/' }
        ],
        'Inheritance': [
            { title: '📺 Inheritance and Polymorphism - YouTube', url: 'https://youtu.be/46T2wD3IuhM?si=SuPeTYdSD6kwoViW' },
            { title: '📚 Inheritance - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/cpp/inheritance-in-c/' }
        ],
        'Polymorphism': [
            { title: '📺 Inheritance and Polymorphism - YouTube', url: 'https://youtu.be/46T2wD3IuhM?si=SuPeTYdSD6kwoViW' },
            { title: '📚 Polymorphism - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/cpp/cpp-polymorphism/' }
        ],
        'Pointers': [
            { title: '📺 Pointers - YouTube', url: 'https://youtu.be/zuegQmMdy8M?si=1ZbtSfJjQt6C-N7p' },
            { title: '📚 Pointers and References - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/cpp/pointers-and-references-in-c/' }
        ]
    },

    // ========== DATA SCIENCE (if you add it later) ==========
    'data_science': {
        'Data Science': [
            { title: '📚 Data Science Tutorial - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-science-tutorial/' }
        ]
    }
};

// ===== SMART LOOKUP FUNCTION =====
// Handles flexible matching: exact match, partial match, normalized match
function findBestMatch(subject, subtopicName) {
    const subjectData = REFERENCE_LINKS[subject];
    if (!subjectData) return null;

    // 1. Try EXACT match first
    if (subjectData[subtopicName]) {
        return subjectData[subtopicName];
    }

    // 2. Try case-insensitive match
    const lowerSubtopic = subtopicName.toLowerCase();
    for (const [key, value] of Object.entries(subjectData)) {
        if (key.toLowerCase() === lowerSubtopic) {
            return value;
        }
    }

    // 3. Try partial match (contains)
    for (const [key, value] of Object.entries(subjectData)) {
        if (key.toLowerCase().includes(lowerSubtopic) || lowerSubtopic.includes(key.toLowerCase())) {
            return value;
        }
    }

    return null;
}

// ===== NORMALIZE SUBJECT ID =====
function normalizeSubjectId(subjectId) {
    const mapping = {
        'Python Programming': 'python',
        'python': 'python',
        'C Programming': 'c',
        'c': 'c',
        'C++': 'cpp',
        'cpp': 'cpp',
        'C++ Programming': 'cpp',
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

// ===== GET REFERENCE LINKS - WITH SMART MATCHING =====
function getReferenceLinks(subject, topic, subtopic) {
    try {
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
        
        // Try to find the best match for this subtopic
        const links = findBestMatch(normalizedSubject, subtopic);
        
        if (links && links.length > 0) {
            console.log(`✅ Found ${links.length} links for "${subtopic}"`);
            return links;
        }
        
        // If no direct match, try the topic name
        const topicLinks = findBestMatch(normalizedSubject, topic);
        if (topicLinks && topicLinks.length > 0) {
            console.log(`✅ Using topic links for "${topic}" as fallback`);
            return topicLinks;
        }
        
        // Last resort: return first available links from this subject
        const firstAvailable = Object.values(subjectLinks)[0];
        if (firstAvailable && firstAvailable.length > 0) {
            console.log('⚠️ Using first available links as fallback');
            return firstAvailable;
        }
        
        return getDefaultLinks(normalizedSubject);
        
    } catch (error) {
        console.error('❌ Error getting reference links:', error);
        return getDefaultLinks(subject);
    }
}

// ===== DEFAULT LINKS =====
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

// ===== MAKE GLOBALLY AVAILABLE =====
window.normalizeSubjectId = normalizeSubjectId;
window.getReferenceLinks = getReferenceLinks;

console.log('✅ reference-links.js loaded - Functions are globally available with smart matching');