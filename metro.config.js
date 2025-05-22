const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

// Ajouter cette configuration pour résoudre les problèmes d'importation Firebase
config.resolver = {
    ...config.resolver,
    sourceExts: [...config.resolver.sourceExts, 'cjs'],
    extraNodeModules: {
      ...config.resolver.extraNodeModules,
      '@firebase/auth': require.resolve('@firebase/auth'),
    },
  };
  
config.resolver.sourceExts.push('cjs');
// Ajouter cette configuration pour résoudre les problèmes d'importation Firebase
config.resolver.unstable_enablePackageExports = false;
module.exports = withNativeWind(config, { input: './global.css' });
