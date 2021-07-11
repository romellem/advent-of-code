const { input } = require('./input.js');
const { Grid, Ground } = require('./ground.js');
const fs = require('fs-extra');
const path = require('path');
const Jimp = require('jimp');
const { spawn } = require('child_process');

// Helpers

const getPaths = (bin_path) => {
	const envPath = process.env.PATH || '';
	const envExt = process.env.PATHEXT || '';
	return envPath
		.replace(/["]+/g, '')
		.split(path.delimiter)
		.map((chunk) => {
			return envExt
				.split(path.delimiter)
				.map((ext) => path.join(chunk, bin_path + ext));
		})
		.reduce((a, b) => a.concat(b), []);
};

/**
 * Helper utility to check if a binary exists in our $PATH variable.
 * @see https://github.com/springernature/hasbin/blob/5af037b/lib/hasbin.js
 * @license MIT
 * @returns {Boolean}
 */
const hasBinary = (bin) => {
	return getPaths(bin).some((filePath) => {
		try {
			return fs.statSync(filePath).isFile();
		} catch (error) {
			return false;
		}
	});
};

const grid = new Grid(input);
const ground = new Ground({ grid });

fs.writeFileSync('grid.txt', ground.toString());
(async () => {
	let empty_grid_image_buffer = await ground.toImage({
		callback: async ({ image }) => {
			return await image.getBufferAsync(Jimp.MIME_PNG);
		},
	});
	fs.writeFileSync('grid.png', empty_grid_image_buffer);

	if (hasBinary('ffmpeg')) {
		await ground.fill(true);

		let image_buffer = await ground.toImage({
			trimmed: true,
			callback: async ({ image, grid_instance }) => {
				const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
				return buffer;
			},
		});
		fs.writeFileSync('filled-grid.png', image_buffer);
		fs.writeFileSync('filled-grid.txt', ground.toString());

		fs.removeSync('animation.mp4');
		await new Promise((resolve, reject) => {
			let video_process = spawn(
				'ffmpeg',
				`-framerate 60 -i frames/frame_%04d.png -c:v libx264 -pix_fmt yuv420p animation.mp4`.split(
					' '
				),
				{ stdio: 'inherit' }
			);

			video_process.on('close', (code) => resolve(code));
			video_process.on('error', (...args) => reject(args));
		});
		fs.removeSync('frames');
		console.log('Wrote to "animation.mp4"');
	}
})();
