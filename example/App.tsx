/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  Touchable,
  PanResponder,
  PanResponderInstance,
  Dimensions,
  Text
} from 'react-native';
import ModalWithInput from './src/components/modal-with-input';

// export default class extends React.PureComponent {
//   private indexValue: Animated.Value;
//   private panResponder: PanResponderInstance;
//   private position: number;
//
//   constructor(props: any) {
//     super(props);
//
//     this.indexValue = new Animated.Value(0);
//     this.position = 0;
//
//     this.panResponder = PanResponder.create({
//       // 要求成为响应者：
//       onStartShouldSetPanResponder: (evt, gestureState) => true,
//       onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
//       onMoveShouldSetPanResponder: (evt, gestureState) => true,
//       onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
//
//       onPanResponderGrant: ({nativeEvent}) => {
//         // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
//
//         // gestureState.{x,y} 现在会被设置为0
//       },
//       onPanResponderMove: ({nativeEvent}, gestureState) => {
//
//         this.indexValue.setValue(this.position + gestureState.dx)
//         // 最近一次的移动距离为gestureState.move{X,Y}
//
//         // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
//       },
//       onPanResponderTerminationRequest: (evt, gestureState) => true,
//       onPanResponderRelease: (evt, gestureState) => {
//
//         console.log('end', evt, gestureState);
//
//         this.position = gestureState.dx + this.position;
//         // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
//         // 一般来说这意味着一个手势操作已经成功完成。
//       },
//       onPanResponderTerminate: (evt, gestureState) => {
//
//         this.position = gestureState.dx + this.position;
//
//         console.log('cancel', evt, gestureState);
//         // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
//       },
//       onShouldBlockNativeResponder: (evt, gestureState) => {
//
//         // console.log(evt, gestureState);
//         // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
//         // 默认返回true。目前暂时只支持android。
//         return true;
//       },
//     })
//   }
//
//
//   render() {
    {/*return (*/}
      {/*<ScrollView style={{height: Dimensions.get('window').height}}>*/}
        {/*<View style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>*/}
          {/*<Text>*/}
            {/*header*/}
          {/*</Text>*/}
        {/*</View>*/}
//         <View {...this.panResponder.panHandlers} style={{flex: 1}}>
//           <Animated.View style={{
//             width: Dimensions.get('window').width * 5,
//             flex: 1,
//             flexDirection: 'row',
//             transform: [
//               {
//                 translateX: this.indexValue,
//               },
//             ],
//           }}>
//             <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
//               <View><Text>1</Text></View><View><Text>2</Text></View><View><Text>3</Text></View><View><Text>4</Text></View><View><Text>5</Text></View><View><Text>6</Text></View><View><Text>7</Text></View><View><Text>8</Text></View><View><Text>9</Text></View><View><Text>10</Text></View><View><Text>11</Text></View><View><Text>12</Text></View><View><Text>13</Text></View><View><Text>14</Text></View><View><Text>15</Text></View><View><Text>16</Text></View><View><Text>17</Text></View><View><Text>18</Text></View><View><Text>19</Text></View><View><Text>20</Text></View><View><Text>21</Text></View><View><Text>22</Text></View><View><Text>23</Text></View><View><Text>24</Text></View><View><Text>25</Text></View><View><Text>26</Text></View><View><Text>27</Text></View><View><Text>28</Text></View><View><Text>29</Text></View><View><Text>30</Text></View><View><Text>31</Text></View><View><Text>32</Text></View><View><Text>33</Text></View><View><Text>34</Text></View><View><Text>35</Text></View><View><Text>36</Text></View><View><Text>37</Text></View><View><Text>38</Text></View><View><Text>39</Text></View><View><Text>40</Text></View><View><Text>41</Text></View><View><Text>42</Text></View><View><Text>43</Text></View><View><Text>44</Text></View><View><Text>45</Text></View><View><Text>46</Text></View><View><Text>47</Text></View><View><Text>48</Text></View><View><Text>49</Text></View><View><Text>50</Text></View><View><Text>51</Text></View><View><Text>52</Text></View><View><Text>53</Text></View><View><Text>54</Text></View><View><Text>55</Text></View><View><Text>56</Text></View><View><Text>57</Text></View><View><Text>58</Text></View><View><Text>59</Text></View><View><Text>60</Text></View><View><Text>61</Text></View><View><Text>62</Text></View><View><Text>63</Text></View><View><Text>64</Text></View><View><Text>65</Text></View><View><Text>66</Text></View><View><Text>67</Text></View><View><Text>68</Text></View><View><Text>69</Text></View><View><Text>70</Text></View><View><Text>71</Text></View><View><Text>72</Text></View><View><Text>73</Text></View><View><Text>74</Text></View><View><Text>75</Text></View><View><Text>76</Text></View><View><Text>77</Text></View><View><Text>78</Text></View><View><Text>79</Text></View><View><Text>80</Text></View>
//             </ScrollView>
//             <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
//               <View><Text>2</Text></View><View><Text>2</Text></View><View><Text>3</Text></View><View><Text>4</Text></View><View><Text>5</Text></View><View><Text>6</Text></View><View><Text>7</Text></View><View><Text>8</Text></View><View><Text>9</Text></View><View><Text>10</Text></View><View><Text>11</Text></View><View><Text>12</Text></View><View><Text>13</Text></View><View><Text>14</Text></View><View><Text>15</Text></View><View><Text>16</Text></View><View><Text>17</Text></View><View><Text>18</Text></View><View><Text>19</Text></View><View><Text>20</Text></View><View><Text>21</Text></View><View><Text>22</Text></View><View><Text>23</Text></View><View><Text>24</Text></View><View><Text>25</Text></View><View><Text>26</Text></View><View><Text>27</Text></View><View><Text>28</Text></View><View><Text>29</Text></View><View><Text>30</Text></View><View><Text>31</Text></View><View><Text>32</Text></View><View><Text>33</Text></View><View><Text>34</Text></View><View><Text>35</Text></View><View><Text>36</Text></View><View><Text>37</Text></View><View><Text>38</Text></View><View><Text>39</Text></View><View><Text>40</Text></View><View><Text>41</Text></View><View><Text>42</Text></View><View><Text>43</Text></View><View><Text>44</Text></View><View><Text>45</Text></View><View><Text>46</Text></View><View><Text>47</Text></View><View><Text>48</Text></View><View><Text>49</Text></View><View><Text>50</Text></View><View><Text>51</Text></View><View><Text>52</Text></View><View><Text>53</Text></View><View><Text>54</Text></View><View><Text>55</Text></View><View><Text>56</Text></View><View><Text>57</Text></View><View><Text>58</Text></View><View><Text>59</Text></View><View><Text>60</Text></View><View><Text>61</Text></View><View><Text>62</Text></View><View><Text>63</Text></View><View><Text>64</Text></View><View><Text>65</Text></View><View><Text>66</Text></View><View><Text>67</Text></View><View><Text>68</Text></View><View><Text>69</Text></View><View><Text>70</Text></View><View><Text>71</Text></View><View><Text>72</Text></View><View><Text>73</Text></View><View><Text>74</Text></View><View><Text>75</Text></View><View><Text>76</Text></View><View><Text>77</Text></View><View><Text>78</Text></View><View><Text>79</Text></View><View><Text>80</Text></View>
//             </ScrollView>
            {/*<ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>*/}
              {/*<View><Text>3</Text></View><View><Text>2</Text></View><View><Text>3</Text></View><View><Text>4</Text></View><View><Text>5</Text></View><View><Text>6</Text></View><View><Text>7</Text></View><View><Text>8</Text></View><View><Text>9</Text></View><View><Text>10</Text></View><View><Text>11</Text></View><View><Text>12</Text></View><View><Text>13</Text></View><View><Text>14</Text></View><View><Text>15</Text></View><View><Text>16</Text></View><View><Text>17</Text></View><View><Text>18</Text></View><View><Text>19</Text></View><View><Text>20</Text></View><View><Text>21</Text></View><View><Text>22</Text></View><View><Text>23</Text></View><View><Text>24</Text></View><View><Text>25</Text></View><View><Text>26</Text></View><View><Text>27</Text></View><View><Text>28</Text></View><View><Text>29</Text></View><View><Text>30</Text></View><View><Text>31</Text></View><View><Text>32</Text></View><View><Text>33</Text></View><View><Text>34</Text></View><View><Text>35</Text></View><View><Text>36</Text></View><View><Text>37</Text></View><View><Text>38</Text></View><View><Text>39</Text></View><View><Text>40</Text></View><View><Text>41</Text></View><View><Text>42</Text></View><View><Text>43</Text></View><View><Text>44</Text></View><View><Text>45</Text></View><View><Text>46</Text></View><View><Text>47</Text></View><View><Text>48</Text></View><View><Text>49</Text></View><View><Text>50</Text></View><View><Text>51</Text></View><View><Text>52</Text></View><View><Text>53</Text></View><View><Text>54</Text></View><View><Text>55</Text></View><View><Text>56</Text></View><View><Text>57</Text></View><View><Text>58</Text></View><View><Text>59</Text></View><View><Text>60</Text></View><View><Text>61</Text></View><View><Text>62</Text></View><View><Text>63</Text></View><View><Text>64</Text></View><View><Text>65</Text></View><View><Text>66</Text></View><View><Text>67</Text></View><View><Text>68</Text></View><View><Text>69</Text></View><View><Text>70</Text></View><View><Text>71</Text></View><View><Text>72</Text></View><View><Text>73</Text></View><View><Text>74</Text></View><View><Text>75</Text></View><View><Text>76</Text></View><View><Text>77</Text></View><View><Text>78</Text></View><View><Text>79</Text></View><View><Text>80</Text></View>*/}
//             </ScrollView>
//             <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
//               <View><Text>4</Text></View><View><Text>2</Text></View><View><Text>3</Text></View><View><Text>4</Text></View><View><Text>5</Text></View><View><Text>6</Text></View><View><Text>7</Text></View><View><Text>8</Text></View><View><Text>9</Text></View><View><Text>10</Text></View><View><Text>11</Text></View><View><Text>12</Text></View><View><Text>13</Text></View><View><Text>14</Text></View><View><Text>15</Text></View><View><Text>16</Text></View><View><Text>17</Text></View><View><Text>18</Text></View><View><Text>19</Text></View><View><Text>20</Text></View><View><Text>21</Text></View><View><Text>22</Text></View><View><Text>23</Text></View><View><Text>24</Text></View><View><Text>25</Text></View><View><Text>26</Text></View><View><Text>27</Text></View><View><Text>28</Text></View><View><Text>29</Text></View><View><Text>30</Text></View><View><Text>31</Text></View><View><Text>32</Text></View><View><Text>33</Text></View><View><Text>34</Text></View><View><Text>35</Text></View><View><Text>36</Text></View><View><Text>37</Text></View><View><Text>38</Text></View><View><Text>39</Text></View><View><Text>40</Text></View><View><Text>41</Text></View><View><Text>42</Text></View><View><Text>43</Text></View><View><Text>44</Text></View><View><Text>45</Text></View><View><Text>46</Text></View><View><Text>47</Text></View><View><Text>48</Text></View><View><Text>49</Text></View><View><Text>50</Text></View><View><Text>51</Text></View><View><Text>52</Text></View><View><Text>53</Text></View><View><Text>54</Text></View><View><Text>55</Text></View><View><Text>56</Text></View><View><Text>57</Text></View><View><Text>58</Text></View><View><Text>59</Text></View><View><Text>60</Text></View><View><Text>61</Text></View><View><Text>62</Text></View><View><Text>63</Text></View><View><Text>64</Text></View><View><Text>65</Text></View><View><Text>66</Text></View><View><Text>67</Text></View><View><Text>68</Text></View><View><Text>69</Text></View><View><Text>70</Text></View><View><Text>71</Text></View><View><Text>72</Text></View><View><Text>73</Text></View><View><Text>74</Text></View><View><Text>75</Text></View><View><Text>76</Text></View><View><Text>77</Text></View><View><Text>78</Text></View><View><Text>79</Text></View><View><Text>80</Text></View>
//             </ScrollView>
//             <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
//               <View><Text>5</Text></View><View><Text>2</Text></View><View><Text>3</Text></View><View><Text>4</Text></View><View><Text>5</Text></View><View><Text>6</Text></View><View><Text>7</Text></View><View><Text>8</Text></View><View><Text>9</Text></View><View><Text>10</Text></View><View><Text>11</Text></View><View><Text>12</Text></View><View><Text>13</Text></View><View><Text>14</Text></View><View><Text>15</Text></View><View><Text>16</Text></View><View><Text>17</Text></View><View><Text>18</Text></View><View><Text>19</Text></View><View><Text>20</Text></View><View><Text>21</Text></View><View><Text>22</Text></View><View><Text>23</Text></View><View><Text>24</Text></View><View><Text>25</Text></View><View><Text>26</Text></View><View><Text>27</Text></View><View><Text>28</Text></View><View><Text>29</Text></View><View><Text>30</Text></View><View><Text>31</Text></View><View><Text>32</Text></View><View><Text>33</Text></View><View><Text>34</Text></View><View><Text>35</Text></View><View><Text>36</Text></View><View><Text>37</Text></View><View><Text>38</Text></View><View><Text>39</Text></View><View><Text>40</Text></View><View><Text>41</Text></View><View><Text>42</Text></View><View><Text>43</Text></View><View><Text>44</Text></View><View><Text>45</Text></View><View><Text>46</Text></View><View><Text>47</Text></View><View><Text>48</Text></View><View><Text>49</Text></View><View><Text>50</Text></View><View><Text>51</Text></View><View><Text>52</Text></View><View><Text>53</Text></View><View><Text>54</Text></View><View><Text>55</Text></View><View><Text>56</Text></View><View><Text>57</Text></View><View><Text>58</Text></View><View><Text>59</Text></View><View><Text>60</Text></View><View><Text>61</Text></View><View><Text>62</Text></View><View><Text>63</Text></View><View><Text>64</Text></View><View><Text>65</Text></View><View><Text>66</Text></View><View><Text>67</Text></View><View><Text>68</Text></View><View><Text>69</Text></View><View><Text>70</Text></View><View><Text>71</Text></View><View><Text>72</Text></View><View><Text>73</Text></View><View><Text>74</Text></View><View><Text>75</Text></View><View><Text>76</Text></View><View><Text>77</Text></View><View><Text>78</Text></View><View><Text>79</Text></View><View><Text>80</Text></View>
//             </ScrollView>
//           </Animated.View>
//         </View>
//       </ScrollView>
//     );
//   }
// }


const App = () => {

  return (
    <View style={{marginTop: 100, flex: 1, overflow: 'hidden'}}>
      <ModalWithInput />
    </View>
  );
};

export default App;
