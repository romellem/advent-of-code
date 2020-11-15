// MIT License, see: https://github.com/gh-canon/stack-snippet-console/blob/master/LICENSE

var attachConsoleTo = (() => {
	// let ran_once = false;
	if (!console) window.console = {};
	/* original function references */
	const _assert = console.assert;
	const _dir = console.dir;
	const _log = console.log;
	const _info = console.info;
	const _error = console.error;
	const _warn = console.warn;
	const _clear = console.clear;
	const _time = console.time;
	const _timeEnd = console.timeEnd;
	const _count = console.count;
	const _dirxml = console.dirxml;
	const _table = console.table;

	const style = document.createElement('style');
	style.type = 'text/css';
	style.textContent = [
		'.as-console-wrapper { /* position: fixed; */ bottom: 0; left: 0; right: 0; max-height: 150px; overflow-y: scroll; overflow-x: hidden; border-top: 1px solid #000; display: none; background: #fff; }',
		'.as-console-wrapper.as-console-maximized { top: 0px; max-height: inherit; display:block; background: #fff; border-top: none;  }',
		'.as-console { border: 1px solid #f0f0f0; display: table; width: 100%; border-collapse: collapse; }',
		'.as-console-row { display: table-row; font-family: monospace; font-size: 10pt; }',
		'.as-console-timestamps .as-console-row:after { display: table-cell; padding: 3px 6px; color: rgba(0,0,0,.35); border: 1px solid #f0f0f0; content: attr(data-date); vertical-align: top; }',
		'.as-console-row + .as-console-row > * { border: 1px solid #f0f0f0; }',
		'.as-console-row-code { width: 100%; white-space: pre-wrap; padding: 3px 5px; display: table-cell; font-family: monospace; font-size: 13px; vertical-align: middle; }',
		".as-console-error:before { content: 'Error: '; color: #f00; }",
		".as-console-assert:before { content: 'Assertion failed: '; color: #f00; }",
		".as-console-info:before { content: 'Info: '; color: #00f; }",
		".as-console-warning:before { content: 'Warning: '; color: #e90 }",
		'@-webkit-keyframes as-console-flash { 0% { background: rgba(255,240,0,.25); } 100% { background: none; } }',
		'@-moz-keyframes as-console-flash { 0% { background: rgba(255,240,0,.25); } 100% { background: none; } }',
		'@-ms-keyframes as-console-flash { 0% { background: rgba(255,240,0,.25); } 100% { background: none; } }',
		'@keyframes as-console-flash { 0% { background: rgba(255,240,0,.25); } 100% { background: none; } }',
		'.as-console-row-code, .as-console-row:after { -webkit-animation: as-console-flash 1s; -moz-animation: as-console-flash 1s; -ms-animation: as-console-flash 1s; animation: as-console-flash 1s; }',
		'.as-console-dictionary { margin: 0; padding: 0 0 0 20px; background-color: #fff; list-style: none; white-space: normal; }',
		'.as-console-dictionary-label { color: #831393; }',
		".as-console-dictionary-label::after { content: ':'; margin-right: 6px; font-style: normal;}",
		'.as-console-expandable-value { cursor: default; white-space: nowrap; }',
		".as-console-expandable-value::before { content: ''; display: inline-block; margin: 0 4px 0 0; width: 8.316px; height: 7.2px; background-size: 100%; background-repeat: no-repeat; background-position: center center; background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTMuODU2cHgiIGhlaWdodD0iMTJweCIgdmlld0JveD0iMCAwIDEzLjg1NiAxMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTMuODU2IDEyIj48cG9seWdvbiBmaWxsPSIjQ0NDQ0NDIiBwb2ludHM9IjEzLjg1NiwwIDYuOTI4LDEyIDAsMCAiLz48L3N2Zz4='); }",
		'.as-console-collapsed-value::before { transform-origin: center center; transform: rotate(-90deg); margin: 0 4px 1px 0;  }',
		'.as-console-collapsed-value .as-console-dictionary { display: none; }',
		'.as-console-ellipsis { display: none; }',
		'.as-console-collapsed-value .as-console-ellipsis { display: inline; }',
		'.as-console-type-label, .as-console-nil-value { color: #808080; }',
		'.as-console-literal-value, .as-console-expandable-value .as-console-string-value { color: #C00; }',
		".as-console-expandable-value .as-console-string-value::before, .as-console-expandable-value .as-console-string-value::after { content: '\"'; color: #000; }",
		'.as-console-keyword { color: #00F; }',
		'.as-console-non-enumerable-value > .as-console-dictionary-label { color: #b571be; }',
		'.as-console-function-preview { font-style: italic; }',
		'.as-console-table { width: 100%; table-layout: fixed; border-collapse: collapse; background-color: #fff; border: 1px solid #aaa; }',
		'.as-console-table thead { background-color: #f3f3f3; border-bottom: 1px solid #aaa; }',
		'.as-console-table th { font-weight: normal; text-align: left; }',
		'.as-console-table th, .as-console-table td { padding: 3px 6px; border-style: solid; border-width: 0 1px; border-color: #aaa; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
		'.as-console-table tbody tr:nth-of-type(even) {background-color: #f3f7fd;}',
		'.as-console-helper-property > .as-console-dictionary-label {font-style: italic;}',
	].join('\n');

	document.head.appendChild(style);

	let inserted_consoles = [];

	/**
	 * @param {String} qs - A valid query selector where the virtual console will be appended to.
	 * @returns {Element?} - Returns the element we appended the virtual console to, or `undefined` if no element is found.
	 */
	return (qs) => {
		const timeKeeper = {};
		const countKeeper = {};

		const wrapper = document.createElement('div');
		const div = document.createElement('div');

		/* settings */
		let maxEntries = 50;
		let maximized = false;
		let autoScroll = true;

		wrapper.className = 'as-console-wrapper as-console-timestamps';
		div.className = 'as-console';

		let insertion_ele = document.querySelector(qs);
		if (!insertion_ele) return;

		inserted_consoles.push(wrapper);

		insertion_ele.appendChild(wrapper).appendChild(div);

		function formatDate(d) {
			let ms = d.valueOf();
			if (isNaN(ms)) return 'Invalid Date';
			d = new Date(ms - d.getTimezoneOffset() * 60000);
			let result = d.toISOString().replace('Z', '').replace('T', ' ');
			return result;
		}

		function flushMessageBuffer(buffer, messasge) {
			if (buffer.length) {
				messasge.appendChild(document.createTextNode(buffer.join('')));
				buffer.splice(0);
			}
		}

		let domify = (() => {
			const domValueMap = new WeakMap();

			function toggleExpansion(e) {
				if (
					e.target === this ||
					(e.target.parentNode === this && e.target.tagName !== 'UL')
				) {
					if (this.classList.contains('as-console-collapsed-value')) {
						expandObjectDom.call(this, e);
						this.classList.remove('as-console-collapsed-value');
						this.classList.add('as-console-expanded-value');
					} else {
						domValueMap.delete(
							this.removeChild(this.children[this.children.length - 2])
						);
						this.classList.remove('as-console-expanded-value');
						this.classList.add('as-console-collapsed-value');
					}
				}
			}

			function getPropertyEntry(name, value, enumerable, failedAccess) {
				let li = document.createElement('li');
				li.classList.add('as-console-dictionary-entry');
				if (!enumerable) {
					li.classList.add('as-console-non-enumerable-value');
				}
				let span = document.createElement('span');
				span.classList.add('as-console-dictionary-label');
				span.textContent = name;
				li.appendChild(span);
				span = document.createElement('span');
				span.classList.add('as-console-dictionary-value');
				if (failedAccess) {
					span.textContent = value;
					span.classList.add('as-console-error');
				} else {
					span.appendChild(domify(value));
				}
				li.appendChild(span);
				return li;
			}

			function getRootValue(element, name) {
				try {
					let value = domValueMap.get(element)[name];
					if (typeof value === 'function') {
						return value;
					}
				} catch (err) {
					/* Access violation */
				}

				if (name === 'prototype') {
					return domValueMap.get(element)[name];
				}
				do {
					if (
						element.classList &&
						element.classList.contains('as-console-expandable-value') &&
						!element.classList.contains('as-console-proto')
					) {
						return domValueMap.get(element)[name];
					}
				} while ((element = element.parentNode));
			}

			const rxNumeric = /^[0-9]+$/;

			function sortPropertyDescriptors(a, b) {
				if (a.enumerable > b.enumerable) {
					return -1;
				} else if (a.enumerable < b.enumerable) {
					return 1;
				} else {
					let aNumeric = rxNumeric.test(a.name),
						bNumeric = rxNumeric.test(b.name),
						aVal = aNumeric ? parseInt(a.name, 10) : a.name,
						bVal = bNumeric ? parseInt(b.name, 10) : b.name,
						aIsNaN = isNaN(aVal) || !aNumeric,
						bIsNaN = isNaN(bVal) || !bNumeric;

					if (aIsNaN < bIsNaN) {
						return -1;
					} else if (aIsNaN > bIsNaN) {
						return 1;
					} else {
						return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
					}
				}
			}

			function getPropertyDescriptors(obj) {
				let descriptors = [],
					protoChain = new WeakMap(),
					depth = 0;

				try {
					if (obj[Symbol.iterator]) {
						for (let i = 0, ln = obj.length; i < ln; i++) {
							descriptors.push({
								name: String(i),
								enumerable: true,
							});
						}
					}
				} catch (err) {
					/* failed iteration */
				}

				do {
					protoChain.set(obj, true);
					let _properties = Object.getOwnPropertyDescriptors(obj);
					for (let name in _properties) {
						if (name === '__proto__') continue;
						if (!descriptors.some((d) => d.name === name)) {
							let prop = _properties[name];
							if (depth === 0 || (prop.enumerable && prop.configurable)) {
								prop.name = name;
								descriptors.push(prop);
							}
						}
					}
					obj = Object.getPrototypeOf(obj);
					depth++;
				} while (obj && !protoChain.has(obj));

				descriptors.sort(sortPropertyDescriptors);

				return descriptors;
			}

			function expandObjectDom() {
				let span,
					li,
					value = domValueMap.get(this),
					ul = document.createElement('ul');

				ul.classList.add('as-console-dictionary');

				let descriptors = getPropertyDescriptors(value);

				for (let descriptor of descriptors) {
					let propertyValue, failedAccess;

					try {
						propertyValue = getRootValue(this, descriptor.name);
					} catch (err) {
						propertyValue = err.message;
						failedAccess = true;
					}

					try {
						ul.appendChild(
							getPropertyEntry(
								descriptor.name,
								propertyValue,
								descriptor.enumerable,
								failedAccess
							)
						);
					} catch (err) {
						// thanks, M$...
					}
				}

				if (value instanceof Map) {
					ul.appendChild(
						getPropertyEntry(
							'[[Entries]]',
							[...value].map((o) => ({ key: o[0], value: o[1] })),
							true,
							false
						)
					).classList.add('as-console-helper-property');
				} else if (value instanceof Set) {
					ul.appendChild(
						getPropertyEntry('[[Entries]]', [...value], true, false)
					).classList.add('as-console-helper-property');
				}

				if (typeof value !== 'function') {
					let proto = Object.getPrototypeOf(value);
					if (proto) {
						ul.appendChild(
							getPropertyEntry('__proto__', proto, false)
						).lastElementChild.firstElementChild.classList.add('as-console-proto');
					}
				}

				this.classList.remove('as-console-collapsed-value');
				this.classList.add('as-console-expanded-value');
				this.insertBefore(ul, this.lastElementChild);
				//this.removeEventListener("click", expandObjectDom);
				//this.addEventListener("click", toggleExpansion);
			}

			function getArgs(
				func
			) /* source: humbletim @ https://stackoverflow.com/a/31194949/621962 */ {
				return Function.prototype.toString
					.call(func)
					.replace(/[/][/].*$/gm, '') // strip single-line comments
					.replace(/\s+/g, '') // strip white space
					.replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
					.split(/(\)?=>)|\){/, 1)[0]
					.replace(/^[^(]*[(]/, '') // extract the parameters
					.replace(/=[^,\)]+/g, '') // strip any ES6 defaults
					.split(',')
					.filter(Boolean); // split & filter [""]
			}

			return function domify(value, config) {
				config = config || {};

				let type = Object.prototype.toString.call(value).slice(8, -1),
					span = document.createElement('span');

				span.classList.add('as-console-value');

				switch (type) {
					case 'Null':
					case 'Undefined':
						span.textContent = String(value);
						span.classList.add('as-console-nil-value');
						break;
					case 'RegExp':
					case 'Symbol':
						span.classList.add('as-console-literal-value');
						span.textContent = String(value);
						break;
					case 'String':
						span.textContent = value;
						if (!config.noStyle) {
							span.classList.add('as-console-string-value');
						}
						break;
					case 'Boolean':
					case 'Number':
						span.textContent = String(value);
						span.classList.add('as-console-keyword');
						break;
					default:
						if (value instanceof Error) {
							let errorString = `${value.name}: ${value.message}`;
							let stack = value.stack;
							if (stack) {
								if (stack.indexOf(errorString) === 0) {
									errorString = stack;
								} else {
									errorString += '\n' + stack;
								}
							}
							span.textContent = errorString;
							break;
						}
						let caps = type === 'Array' ? '[]' : '{}';
						if (typeof value === 'function') {
							let functionSymbol = document.createElement('span');
							functionSymbol.textContent = 'ƒ ';
							functionSymbol.classList.add('as-console-keyword');
							span.appendChild(functionSymbol);
							let functionPreview = document.createElement('span');
							functionPreview.classList.add('as-console-function-preview');
							functionPreview.textContent = `${value.name}(${getArgs(value).join(
								', '
							)})`;
							span.appendChild(functionPreview);
						} else if (type === 'Date') {
							let typeLabel = document.createElement('span');
							typeLabel.textContent = formatDate(value);
							typeLabel.classList.add('as-console-type-label');
							span.appendChild(typeLabel);
						} else {
							let typeLabel = document.createElement('span');
							typeLabel.textContent = type;
							typeLabel.classList.add('as-console-type-label');
							span.appendChild(typeLabel);
						}
						if (!config.noExpand) {
							span.classList.add('as-console-collapsed-value');
							domValueMap.set(span, value);
							span.appendChild(document.createTextNode(` ${caps[0]}`));
							let ellipsis = document.createElement('span');
							ellipsis.textContent = '…';
							ellipsis.classList.add('as-console-ellipsis');
							span.appendChild(ellipsis);
							span.classList.add('as-console-expandable-value');
							span.addEventListener('click', toggleExpansion);
							span.appendChild(document.createTextNode(caps[1]));
						}
						break;
				}

				return span;
			};
		})();

		function format(formatString, ...args) {
			let message = document.createDocumentFragment();

			let buffer = [];

			let escaped = false;

			let argumentIndex = 0;

			Array.prototype.forEach.call(formatString, (char, index) => {
				if (char === '%' && !escaped) {
					escaped = true;
				} else {
					if (escaped) {
						escaped = false;
						switch (char) {
							case '%':
								buffer.push('%');
								break;
							case 'f':
								flushMessageBuffer(buffer, message);
								message.appendChild(domify(parseFloat(args[argumentIndex++])));
								break;
							case 'd':
							case 'i':
								flushMessageBuffer(buffer, message);
								message.appendChild(domify(Math.floor(args[argumentIndex++])));
								break;
							case 'o':
							case 'O':
								flushMessageBuffer(buffer, message);
								message.appendChild(domify(args[argumentIndex++]));
								break;
							case 's':
								flushMessageBuffer(buffer, message);
								message.appendChild(
									domify(args[argumentIndex++], { noStyle: true })
								);
								break;
						}
					} else {
						buffer.push(char);
					}
				}
			});

			flushMessageBuffer(buffer, message);

			return message;
		}

		function truncateEntries() {
			if (maxEntries < 0) return;
			while (div.childNodes.length > maxEntries) {
				div.removeChild(div.firstChild);
			}
		}

		function createLogEntry(...args) {
			let row = document.createElement('div');
			row.className = 'as-console-row';

			row.setAttribute('data-date', formatDate(new Date()).slice(11));

			let code = row.appendChild(document.createElement('code'));
			code.className = 'as-console-row-code';

			if (
				typeof args[0] === 'string' &&
				args.length > 1 &&
				/((^|[^%])%[sdifoO])/.test(args[0])
			) {
				code.appendChild(format(...args));
			} else {
				args.forEach((arg, i) => {
					if (i > 0) {
						code.appendChild(document.createTextNode(' '));
					}
					code.appendChild(domify(arg));
				});
			}

			row.appendChild(code);

			div.appendChild(row);

			truncateEntries();

			if (autoScroll) wrapper.scrollTop = row.offsetTop;

			return row;
		}

		function showConsole(show) {
			if (maximized) return;
			wrapper.style.display = show ? 'block' : 'none';
		}

		console.log = function (...args) {
			_log && _log.apply(console, args);

			if (!args.length) return;

			createLogEntry(...args);

			showConsole(1);
		};

		console.warn = function (...args) {
			_warn && _warn.apply(console, args);

			if (!args.length) return;

			createLogEntry(...args).children[0].classList.add('as-console-warning');

			showConsole(1);
		};

		console.info = function () {
			let args = arguments;

			_info && _info.apply(console, args);

			if (!args.length) return;

			createLogEntry(...args).children[0].classList.add('as-console-info');

			showConsole(1);
		};

		console.error = function (...args) {
			_error && _error.apply(console, args);

			if (!args.length) return;

			let entry;
			let e = args[0];

			if (e instanceof Error) {
				entry = createLogEntry(e);
			} else {
				entry = createLogEntry(...args);
			}

			entry.children[0].classList.add('as-console-error');

			showConsole(1);
		};

		console.assert = function (...args) {
			_assert && _assert.apply(console, args);

			if (!args[0]) {
				let entry = createLogEntry(...args.slice(1));

				entry.children[0].classList.add('as-console-assert');

				showConsole(1);
			}
		};

		console.dir = function (...args) {
			_dir && _dir.apply(console, args);

			if (!args.length) return;

			createLogEntry(args[0]);

			showConsole(1);
		};

		console.dirxml = function () {
			let args = arguments;

			_dirxml && _dirxml.apply(console, args);

			if (!args.length) return;

			let output = args[0];

			let serializer = new XMLSerializer();

			output = serializer.serializeToString(output);

			createLogEntry('%s', output);

			showConsole(1);
		};

		function getEnumerablePropertyNames(obj) {
			let arr = [];

			do {
				for (let prop of Object.getOwnPropertyNames(obj)) {
					if (
						Object.getOwnPropertyDescriptor(obj, prop).enumerable &&
						!arr.includes(prop)
					) {
						arr.push(prop);
					}
				}
			} while ((obj = Object.getPrototypeOf(obj)) && obj !== Object.prototype);

			return arr;
		}

		function getPropertyNames(obj) {
			let arr = [];

			do {
				for (let prop of Object.getOwnPropertyNames(obj)) {
					if (!arr.includes(prop)) {
						arr.push(prop);
					}
				}
			} while ((obj = Object.getPrototypeOf(obj)) && obj !== Object.prototype);

			return arr;
		}

		function isScalar(value) {
			if (value == null) {
				return true;
			}
			switch (typeof value) {
				case 'function':
					return false;
				case 'object':
					switch (Object.prototype.toString.call(value)) {
						case '[object Date]':
						case '[object RegExp]':
							return true;
						default:
							return false;
					}
			}
			return true;
		}

		function isArray(value) {
			return Object.prototype.toString.call(value) === '[object Array]';
		}

		function hasScalarValues(obj) {
			if (isArray(obj)) {
				return obj.some(isScalar);
			} else {
				for (let prop in getPropertyNames(obj)) {
					if (isScalar(obj[prop])) {
						return true;
					}
				}
				return false;
			}
		}

		function iterate(object, delegate) {
			if (isArray(object)) {
				for (let i = 0, ln = object.length; i < ln; i++) {
					try {
						if (delegate(i, object[i]) === false) {
							break;
						}
					} catch (err) {
						// failed iteration
					}
				}
			} else {
				for (let prop of getPropertyNames(object)) {
					try {
						if (delegate(prop, object[prop]) === false) {
							break;
						}
					} catch (err) {
						// failed iteration
					}
				}
			}
		}

		console.table = function (data, columns) {
			let row = document.createElement('div');
			row.className = 'as-console-row';

			row.setAttribute('data-date', formatDate(new Date()).slice(11));

			let code = row.appendChild(document.createElement('code'));
			code.className = 'as-console-row-code';

			let props = [];

			let table = document.createElement('table');

			table.className = 'as-console-table';

			let thead = document.createElement('thead');

			let tbody = document.createElement('tbody');

			let tr = document.createElement('tr');

			let td = document.createElement('th');

			td.textContent = '(index)';

			tr.appendChild(td);

			let scalarIndex = null;

			let rows = 0;

			iterate(data, function (index, item) {
				if (isScalar(item)) {
					if (!props.includes(null)) {
						props.push(null);
					}
				} else {
					for (let prop of getEnumerablePropertyNames(item)) {
						if (!props.includes(prop)) {
							props.push(prop);
						}
					}
				}
			});

			if (columns) {
				columns = columns.filter((c) => props.includes(c));
				if (props.includes(null)) {
					columns.push(null);
				}
			} else {
				columns = props;
			}

			if (columns.length === 0) {
				columns.push(null);
			} else {
				columns.splice(20);
			}

			thead.appendChild(tr);

			table.appendChild(thead);

			for (let columnName of columns) {
				td = document.createElement('th');
				if (columnName === null) {
					td.textContent = 'Value';
				} else {
					td.textContent = columnName;
				}
				tr.appendChild(td);
			}

			iterate(data, function (index, item) {
				tr = document.createElement('tr');
				td = document.createElement('th');
				td.textContent = index;
				tr.appendChild(td);

				if (isScalar(item)) {
					for (let column of columns) {
						td = document.createElement('td');
						if (column === null) {
							td.appendChild(domify(item, { noExpand: true }));
						}
						tr.appendChild(td);
					}
				} else {
					for (let column of columns) {
						td = document.createElement('td');
						if (column !== null && column in item) {
							td.appendChild(domify(item[column], { noExpand: true }));
						}
						tr.appendChild(td);
					}
				}

				tbody.appendChild(tr);

				return ++rows < 1000;
			});

			table.appendChild(tbody);

			code.appendChild(table);

			row.appendChild(code);

			div.appendChild(row);

			truncateEntries();

			if (autoScroll) wrapper.scrollTop = row.offsetTop;

			_table && _table.apply(console, arguments);
		};

		console.clear = function () {
			while (div.lastChild) {
				div.removeChild(div.lastChild);
			}

			_clear && _clear.apply(console, arguments);

			showConsole(0);
		};

		console.time = function (label) {
			const now = performance.now();

			_time && _time.apply(console, arguments);

			if (!arguments.length) label = 'default';

			timeKeeper[label] = now;
		};

		console.timeEnd = function (label) {
			const now = performance.now();

			_timeEnd && _timeEnd.apply(console, arguments);

			if (!arguments.length) label = 'default';

			if (!(label in timeKeeper)) return;

			let diff = now - timeKeeper[label];

			delete timeKeeper[label];

			createLogEntry('%s: %sms', label, diff.toFixed(3));

			showConsole(1);
		};

		console.count = function (label) {
			_count && _count.apply(console, arguments);

			if (!arguments.length) label = '';

			let count = 1;

			if (label in countKeeper) {
				count = ++countKeeper[label];
			} else {
				countKeeper[label] = count;
			}

			createLogEntry('%s: %i', label, count);

			showConsole(1);
		};

		console.config = function (settings) {
			if (!settings && typeof settings !== 'object') return;

			if ('maxEntries' in settings && settings.maxEntries) {
				let _maxEntries = Number(settings.maxEntries);
				if (!isNaN(maxEntries)) {
					maxEntries = _maxEntries;
					truncateEntries();
				}
			}

			if ('maximize' in settings) {
				if (settings.maximize) {
					wrapper.classList.add('as-console-maximized');
					maximized = true;
				} else {
					wrapper.classList.remove('as-console-maximized');
					maximized = false;
					showConsole(div.children.length);
				}
			}

			if ('autoScroll' in settings) {
				autoScroll = settings.autoScroll == true;
			}

			if ('timeStamps' in settings) {
				if (settings.timeStamps) {
					wrapper.classList.add('as-console-timestamps');
				} else {
					wrapper.classList.remove('as-console-timestamps');
				}
			}
		};

		window.addEventListener('error', function (e) {
			createLogEntry(e).children[0].classList.add('as-console-error');
			_log.call(console, e);
			showConsole(1);
		});

		return insertion_ele;
	};
})();
