class ListNode {
	constructor(value) {
		this.value = value;
		this.next = undefined;
	}
}
class LinkedList {
	constructor(head) {
		this.head = head;
		this.last = head;
	}

	add(list_node) {
		if (!(list_node instanceof ListNode)) {
			list_node = new ListNode(list_node);
		}
		if (!this.head) {
			this.head = list_node;
		} else {
			this.last.next = list_node;
		}
		this.last = list_node;
		return this.last;
	}

	tail() {
		return this.last && this.last.value;
	}

	toString() {
		let acc = '';
		let node = this.head;
		while (node) {
			acc += !acc ? node.value : `,${node.value}`;
			node = node.next;
		}
		return acc;
	}

	*[Symbol.iterator]() {
        let node = this.head;
		while (node) {
			yield node.value;
			node = node.next;
		}
    }
}

let q = new LinkedList();
q.add(1);
q.add(2);
q.add(4);
q.add(6);
q.add(7);

console.log(q.toString());

for (let v of q) {
    console.log('hey', v);
}
