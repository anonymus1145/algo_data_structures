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
function nodes_count(node: MyNode<number>, count: number): number {
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

  // Iterative way
  while (node) {
    count++;
    console.log(`Node${count} -> data:`, node.data);
    if (node.next_node) {
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
  const nodes = nodes_count(first_node, 0);
  if (nodes <= 1 && !first_node.head) {
    return;
  }
  // Split the link_list in 2
  const middle = nodes / 2;

  // As we only have the first node of the list and the total number of nodes we need to go and make tail true at half and head true at half+1
  const split_linked_list = (head: MyNode<number>, middle: number): MyNode<number>[] => {
    let count = 1;
    let current: MyNode<number> | undefined = head;
    while (current && count < middle) {
      current = current.next_node;
      count++;
    }

    if (current && current.next_node) {
      current.tail = true;
      current.next_node.head = true;

      const second_head = current.next_node;
      current.next_node = undefined;

      return [head, second_head];
    }

    return [head];
  }

  // Stores the head of first half and second half
  const heads: MyNode<number>[] = split_linked_list(first_node, middle);

  if (heads.length <= 1) {
    return heads[0];
  }

  const left = merge_sort_link_list(heads[0]);
  const right = merge_sort_link_list(heads[1]);

  // Merge function
  const merge_link_list = (left: MyNode<number>, right: MyNode<number>) => {
    const new_head: MyNode<number> = left;

    return new_head;
  }

  const new_head = merge_link_list(left!, right!);

  return new_head;
}

// merge_sort_link_list(node6);
