interface MyNode<T> {
  data: T,
  head?: boolean,
  tail?: boolean,
  next_node?: MyNode<T>,
  prev_node?: MyNode<T>
}

const node1: MyNode<number> = {
  data: 10,
  head: true
}

const node2: MyNode<number> = {
  data: 20,
}

const node3: MyNode<number> = {
  data: 30,
  tail: true
}

const node4: MyNode<number> = {
  data: 40
}

const node5: MyNode<number> = {
  data: 50,
  tail: true
}

const node6: MyNode<number> = {
  data: 60,
  head: true
}

node1.next_node = node2;
node2.next_node = node3;

//console.log(node1.next_node);       // prints the whole node2 object
//console.log(node1.next_node?.data); // prints 20

// Check if the list is empty -> List traversal
function nodes_count(node: MyNode<number>, count: number, setHeaderTail?: boolean): number {
  // Recursive way
  /*
  if (node.head) {
    count++;
    console.log(count);
  }

  if (node.next_node) {
    count++;
    console.log(count);
    return nodes_count(node.next_node, count);
  }
  return count;
  */

  if (setHeaderTail) {
    node.head = true;
  }

  // Iterative way
  while (node) {
    count++;
    console.log(`Node${count} -> data:`, node.data, `Head: `, node.head, `Tail: `, node.tail);
    if (node.next_node) {
      node.next_node.head = false;
      node.next_node.tail = false;
      node = node.next_node;
    } else {
      break;
    }
  }

  return count;
}

//const total_nodes = nodes_count(node1, 0);
//console.log('Total nodes: ', total_nodes);


// Append/Insert node
function add_node(node: MyNode<number>, new_node: MyNode<number>, position: number = 0) {
  // Insert
  let count = 0;
  if (position > 0) {
    while (node) {
      count++;
      if (node.next_node && count == position - 1) {
        new_node.next_node = node.next_node;
        node.next_node = new_node;
        break;
      } else if (node.next_node) {
        node = node.next_node;
      }
    }
  }

  // Apend -> end of the list
  if (new_node.tail) {
    while (node) {
      if (node.tail) {
        node.tail = false;
        node.next_node = new_node;
        break;
      } else if (node.next_node) {
        node = node.next_node;
      }
    }
  }
  // Add -> beginning of the list
  if (new_node.head) {
    node.head = false;
    new_node.next_node = node;
  }
}


function search(node: MyNode<number>, value: MyNode<number>) {
  while (node) {
    if (node.data == value.data) {
      console.log('Found it!');
      break;
    } else if (node.next_node) {
      node = node.next_node;
    }
  }
}

add_node(node1, node4, 2);
add_node(node1, node5);
add_node(node1, node6);

const total_nodes = nodes_count(node6, 0);
console.log('Total nodes: ', total_nodes);
search(node6, node3);



// Sorting
// Merge sort array
function merge_sort(array: number[]) {
  if (array.length <= 1) {
    return array;
  }
  // Split the list in 2
  const middle = array.length / 2;
  const firstHalf = array.slice(0, middle)
  const secondHalf = array.slice(middle);

  const left = merge_sort(firstHalf);
  const right = merge_sort(secondHalf);

  if (!left || !right) {
    return;
  }

  // Merge function
  const merge = (left: number[], right: number[]) => {
    const new_list: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        new_list.push(left[i]);
        i++;
      } else {
        new_list.push(right[j]);
        j++;
      }
    }

    while (i < left.length) {
      new_list.push(left[i]);
      i++;
    }

    while (j < right.length) {
      new_list.push(right[j]);
      j++;
    }

    return new_list;
  }

  const new_list = merge(left, right);

  return new_list;
}

const array = [10, 2, 6, 11, 44, 23, 8, 21, 13, 15, 76, 43];

const sorted_array = merge_sort(array);
console.log(sorted_array);



// Merge sort link_list
function merge_sort_link_list(first_node: MyNode<number>) {
  // Base case: if the list is empty or has only one node,
  // it's already sorted
  if (!first_node || !first_node.next_node)
    return first_node;

  // Split the list into two halves
  let second = split_linked_list(first_node);

  // Recursively sort each half
  first_node = merge_sort_link_list(first_node);
  second = merge_sort_link_list(second!);

  // Merge the two sorted halves
  const merge_list = merge_link_list(first_node, second!);
  return merge_list;
}

// As we only have the first node of the list and the total number of nodes we need to go and make tail true at half and head true at half+1
const split_linked_list = (head: MyNode<number>) => {
  let fast = head;
  let slow = head;

  // Move fast pointer two steps and slow pointer
  // one step until fast reaches the end
  while (fast && fast.next_node) {
    fast = fast.next_node.next_node!;
    if (fast) {
      slow = slow.next_node!;
    }
  }

  // Split the list into two halves
  let second = slow.next_node;
  slow.next_node = null!;
  return second;
}

// Merge function
const merge_link_list = (first: MyNode<number>, second: MyNode<number>) => {
  // If either list is empty, return the other list
  if (!first)
    return second;
  if (!second)
    return first;

  // Pick the smaller value between first and second nodes
  if (first.data < second.data) {
    first.next_node = merge_link_list(first.next_node!, second);
    return first;
  }
  else {
    second.next_node = merge_link_list(first, second.next_node!);
    return second;
  }
}

const first_node = merge_sort_link_list(node6);
const sorted_nodes = nodes_count(first_node, 0, true);
console.log('Sorted nodes: ', sorted_nodes);

