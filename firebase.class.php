<?
    class websocket{
		static $firebase;
		public static function base($path)
		{

			// self::$firebase = new \Geckob\Firebase\Firebase('data:text/json;base64,'.base64_encode(json_encode(getenv('FIREBASE_PRIVATE_KEY'))));
			self::$firebase = new \Geckob\Firebase\Firebase('./secret.json');
			self::$firebase->setPath($path);
			return new static;
		}
		public function set($item, $value)
		{
			self::$firebase->set($item,$value);
			return $this;
		}
		public function push($locale, $value)
		{
			$element = json_decode(self::$firebase->get($locale),true);
			if(is_array($element)){
				if(is_array($value)){
					$new = array_merge($element,$value);
				}else{
					$new = array_merge($element,[$value]);
				}
				self::$firebase->set($locale,$new);
			}else{
				self::$firebase->set($locale,[$element,$value]);
			}
			return $this;
		}
		public function get($item)
		{
			return self::$firebase->get($item);
		}
		public function delete($item)
		{
			self::$firebase->delete($item);
			return $this;
		}
	}