<?

	// $_firebase = new firebase('./file.json');
	// $_firebase->base($path);
	// $_firebase->set($path,[]);
	// $_firebase->push($path,[]);
	// $_firebase->get($path);
	// $_firebase->delete($path);

    class websocket{
		public static $firebase;
		function __construct($path=null) {
			if ($path==null){
				throw new Exception("É NECESSÁRIO A INCLUSÃO DAS CHAVES DE PERMISSÃO DO FIREBASE", 1);
			}elseif (is_string($path) && file_exists($path)){
				self::$firebase = new \Geckob\Firebase\Firebase($path);
			}else{
				self::$firebase = new \Geckob\Firebase\Firebase('data:text/json;base64,'.base64_encode(json_encode($path)));
			}
		}
		public function base($path){
			self::$firebase->setPath($path);
			return $this;
		}
		public function set($item, $value){
			self::$firebase->set($item,$value);
			return $this;
		}
		public function push($locale, $value){
			$element = json_decode(self::$firebase->get('/'.$locale),true);
			if(is_array($element)){
				if(is_array($value)){
					$new = array_merge($element,$value);
				}else{
					$new = array_merge($element,[$value]);
				}
				self::$firebase->set('/'.$locale,$new);
			}else{
				self::$firebase->set('/'.$locale,[$element,$value]);
			}
			return $this;
		}
		public function get($item){
			return self::$firebase->get($item);
		}
		public function delete($item){
			self::$firebase->delete($item);
			return $this;
		}
	}